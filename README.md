# PERNProject

This project is intended to be an exercise in full-stack development using React, Node and Express while also incorporating some geospatial SQL with a locally hosted PostGIS server.
I had not found any projects online which combined React, Node, Express, PostGIS and Leaflet, and I thought it would be a fun challenge to develop an application with this stack.

The purpose of this project is to make a clone of Google maps using a locally-hosted Open Street Maps extract for the state of New York stored in a Post-GIS database. 
Currently, the project allows the user to type in an address, and then optionally type a string input for a cuisine type, as well as select a subway line to consider restaurants that are off nearby stops on that subway line. The app returns a leaflet map and a table of the results sorted by distance to address. The application is still on back-end development, front-end will be implemented last. 

The intentions for the next commit are to link the table to the leaflet map using react state, when a user clicks a record on the table the feature will highlight on the map. Also intended changes include adding buttons on the map screen to add layers for subway stops, and also to add the ability to search by zip code instead with a map result page of all addresses in a zip code and a table of statistics on how many of each type are within that zipcode.

