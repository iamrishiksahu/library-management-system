import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../../utils/AppConstants'
import { Button } from '@mui/material'
import "./Members.css"
import { useNavigate } from 'react-router-dom'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Members = () => {
    const columns = [

        "ID",
        "Full Name",
        "Address",
        "Phone",
        "Joined",
        "Borrowings",
        "Actions"

    ]
    const [list, setlist] = useState([])
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
            setlist(res.data)
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

            <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            {columns.map((item, i) => {
                  return (
                    <TableCell sx={{fontWeight: '600'}}>{item}</TableCell>
                  )
                })}

         
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                
                <TableCell >{row.member_id}</TableCell>
                <TableCell >{row.full_name}</TableCell>
                <TableCell >{row.address}</TableCell>
                <TableCell >{row.phone}</TableCell>
                <TableCell >{row.created_at}</TableCell>
                <TableCell >{row.total_books_borrowed}</TableCell>
                <TableCell sx={{display: 'flex', gap: '1rem'}}><Button onClick={updateMember} variant='contained'> Update</Button>
                                        <Button onClick={(e) => { e.preventDefault(); deleteMember(row) }} variant='contained'> Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </div>
    )
}

export default Members