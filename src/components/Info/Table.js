import React from 'react'
import { Link } from 'react-router-dom'

const Table = ({results,page}) => {


  return (
    <table className="table">
        <thead>
            <tr>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
            </tr>
        </thead>
        <tbody>
            {results.map(elem => {
                let {name,episode,air_date,id} = elem

                return (
                    <tr key={id}>
                        <th scope='row'>{episode}</th>
                        <td><Link style={{textDecoration: "none"}} to ={`${page}${id}`} key={id} className="text-dark">{name}</Link></td>
                        <td >{air_date}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
  )
}

export default Table