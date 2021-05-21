import React, {useMemo} from 'react'
import {useTable, usePagination} from 'react-table'
import {COLUMNS} from './columns'
import './table.css'
import {FeatureContext, FeaturesProvider} from '../FeaturesContext'

export const Table = ({tabledata}) => {
    const { features, selectedfeature } = React.useContext(FeatureContext);
    const [queriedFeatures, setQueriedFeatures] = features;
    const [highlightedFeature, setHighlighted] = selectedfeature;  
    const columns = useMemo(() => COLUMNS,[])
    const data = useMemo(() => tabledata,[])

    const tableInstance = useTable({
        columns,
        data
    },
    usePagination)
    const{
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
    } = tableInstance


    return (
        <>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()} onClick={() => setHighlighted(row.original)}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
            </table>
            <div>
                <button onClick={() => previousPage()} disabled = {!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()} disabled = {!canNextPage}>Next</button>
            </div>
    </>
  )
}

