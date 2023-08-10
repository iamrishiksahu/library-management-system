import React from 'react'
import "./Table.css"
import { Button } from '@mui/material'


const Table = ({ headings, records, isAction, deleteAction, updateAction }) => {
    return (
        <div className="table-container">

            <table>
                <thead>
                    <tr>

                        {headings.map((item, i) => {
                            return (
                                <th>
                                    {item}
                                </th>
                            )
                        })}


                    </tr>



                </thead>
                <tbody>
                    {records.map((item, i) => {

                        return (
                            <tr>
                                {item.map((cell, j) => {

                                    return (
                                        <td>{cell}</td>
                                    )
                                })}
                                {isAction ? <td><Button onClick={updateAction} variant='contained'> Update</Button>
                                    <Button onClick={(e)=> {e.preventDefault();deleteAction(item)}} variant='contained'> Delete</Button> </td> : <></>}


                            </tr>
                        )

                    })}
                </tbody>


            </table>

        </div>
    )
}

export default Table