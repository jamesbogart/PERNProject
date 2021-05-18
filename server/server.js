require('dotenv').config()
const cors = require('cors')
const express = require('express')
const morgan = require("morgan")
const app = express()
const db = require("./db")

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/api/getNearest',async (req, res) =>{
  let lat = req.query.lat
  let long = req.query.long
  let sub = req.query.subway
  let cuisine = req.query.cuisine

  console.log(sub,long)
  try{
    let q = ''
    let values = []
    if (sub != '' && cuisine != ''){
      q =  "select json_build_object('type', 'FeatureCollection','features', json_agg(ST_AsGeoJSON(t.*)::json)) from (WITH nearbystations as (select s.* FROM osm.subwaypoints s INNER JOIN ( SELECT ss.station_na from osm.subwaypoints ss where ss.line like $1 GROUP BY station_na order by ST_Distance(ST_SetSRID( ST_Point( $2,$3), 4326),ST_COLLECT(ss.wkb_geometry) ) LIMIT 20 ) as b ON s.station_na = b.station_na) SELECT f.name,f.amenity, ST_Transform (f.way, 4326) geom FROM osm.food_point f join nearbystations nbs ON ST_DWithin(f.way, ST_Transform(nbs.wkb_geometry,3857), 500) WHERE f.tags -> 'cuisine' like $4 ORDER BY ST_Distance(ST_Transform(f.way,4326), ST_SetSRID( ST_Point($2,$3 ), 4326) ) ) as t"	
      values = [`%${sub}%`,long,lat,`%${cuisine}%`]      
    }
    else if (sub != '' && cuisine == ''){
      q =  "select json_build_object('type', 'FeatureCollection','features', json_agg(ST_AsGeoJSON(t.*)::json)) from (WITH nearbystations as (select s.* FROM osm.subwaypoints s INNER JOIN ( SELECT ss.station_na from osm.subwaypoints ss where ss.line like $1 GROUP BY station_na order by ST_Distance(ST_SetSRID( ST_Point( $2,$3), 4326),ST_COLLECT(ss.wkb_geometry) ) LIMIT 20 ) as b ON s.station_na = b.station_na) SELECT f.name,f.amenity, ST_Transform (f.way, 4326) geom FROM osm.food_point f  join nearbystations nbs ON ST_DWithin(f.way, ST_Transform(nbs.wkb_geometry,3857), 500) ORDER BY ST_Distance(ST_Transform(f.way,4326), ST_SetSRID( ST_Point($2,$3 ), 4326) ) ) as t"	
      values = [`%${sub}%`,long,lat]
    } else if (sub == '' && cuisine != ''){
      q =  "select json_build_object('type', 'FeatureCollection','features', json_agg(ST_AsGeoJSON(t.*)::json)) from (SELECT f.name,f.amenity, ST_Transform (f.way, 4326) geom FROM osm.food_point f WHERE tags -> 'cuisine' like $1 ORDER BY ST_Distance(ST_Transform(f.way,4326), ST_SetSRID( ST_Point($2,$3 ), 4326) ) LIMIT 20) as t"
      values = [`%${cuisine}%`,long,lat] 
    } else{
      q = "select json_build_object('type', 'FeatureCollection','features', json_agg(ST_AsGeoJSON(t.*)::json)) from (SELECT f.name,f.amenity, ST_Transform (f.way, 4326) geom FROM osm.food_point f ORDER BY ST_Distance(ST_Transform(f.way,4326), ST_SetSRID( ST_Point($1,$2 ), 4326) ) LIMIT 20) as t"
      values = [long,lat]
    }  
    const results = await db.query(q,values)
    const features = results.rows
    res.status(200).json({
      features
    })
  } catch (err){
    console.log(err)
  }  
})

app.get('/getZipcode/:id',(req,res) =>{
    
})

app.get('/', (req,res) =>{
  res.send('<h1>Hello World!</h1>')
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
/*
db = pgosm user=postgres
'''SELECT f.way\n",
"FROM osm.food_point f\n",
"INNER JOIN osm.modzcta z\n",
"ON ST_Intersects(ST_Transform(z.geom,3857),f.way)\n",
"WHERE z.modzcta = '11238'\n",*/
