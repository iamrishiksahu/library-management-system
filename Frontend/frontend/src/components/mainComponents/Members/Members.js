import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../../utils/AppConstants'
import Table from '../../CustomTable/Table'
import { Button } from '@mui/material'
import "./Members.css"
import { useNavigate } from 'react-router-dom'

const Members = () => {
    const columns = [

        "ID",
        "Full Name",
        "Address",
        "Phone",
        "Joined",
        "Borrowings"

    ]
    const [membersList, setMembersList] = useState([])
    const navigate = useNavigate();

    const deleteMember = (item) => {

        console.log(item.member_id.toString());

        axios.delete(`${API_BASE_URL}/members?del=${item.member_id}`).then((res) => {
            
            if(res.data == 'SUCCESS'){
                alert("Successfully Deleted!")
                getAllMembers()
            }
        }).catch((err) => {
            console.log(err)
        })  
    }

    const updateMember = (props) => {

    }

    const getAllMembers = () => {
        axios.get(`${API_BASE_URL}/members`).then((res) => {
            console.log(res.data)
            setMembersList(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllMembers()
    }, [])

    return (
        <div className="component-main-container">
            <div className="component-title-bar">
                <h2 className="section-title">Members</h2>
                <Button variant='contained' size='small' onClick={() => navigate('/add-member')}>+ Add</Button>
            </div>
            <div className="table-container">

                <table>
                    <thead>
                        <tr>

                            {columns.map((item, i) => {
                                return (
                                    <th>
                                        {item}
                                    </th>
                                )
                            })}


                        </tr>



                    </thead>
                    <tbody>
                        {membersList.map((item, i) => {

                            return (
                                <tr>
                                    <td align='center'>{item.member_id}</td>
                                    <td align='center'>{item.full_name}</td>
                                    <td align='center'>{item.address}</td>
                                    <td align='center'>{item.phone}</td>
                                    <td align='center'>{item.created_at}</td>
                                    <td align='center'>{item.total_books_borrowed}</td>
                                    <td align='center'><Button onClick={updateMember} variant='contained'> Update</Button>
                                        <Button onClick={(e) => { e.preventDefault(); deleteMember(item) }} variant='contained'> Delete</Button> </td> 


                                </tr>
                            )

                        })}
                    </tbody>


                </table>

            </div>

        </div>
    )
}

export default Members