import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../../utils/AppConstants'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { issueBookAction, returnBookAction } from '../../../actions/bookAction'


const columns = ['Issue ID', 'Book Title', 'Member Name', 'Issued On']


const IssueBook = () => {

  const [list, setList] = useState([])
  const navigate = useNavigate()
  const getAllIssues = () => {

    axios.get(`${API_BASE_URL}/issue`).then((res) => {
      console.log(res.data)
      setList(res.data)
    }).catch((err) => {
      console.log(err)
    })

  }
  const deleteAct = (item) => {
    alert(item)
  }
  const updateAct = (idx) => {
    issueBookAction({member_id: "19", book_id: "2" });
  } 

  useEffect(() => {
    getAllIssues()
  }, [])

  return (
    <div className="component-main-container">

      <div className="component-title-bar">
        <h2 className="section-title">Issued Books</h2>
        <Button variant='contained' size='small' onClick={() => updateAct()}>+ Add</Button>
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
                <TableCell align='center'>Actions</TableCell>

         
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                
                <TableCell >{row.issueId}</TableCell>
                <TableCell >{row.title}</TableCell>
                <TableCell >{row.full_name}</TableCell>
                <TableCell >{row.issued_at}</TableCell>
                <TableCell align='center' >
                  {row.is_returned? 
                    "Returned"  
                  :<Button onClick={() => returnBookAction({issueId: row.issueId, bookId: row.bookId})} >Return</Button>
                  }
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>



    </div>
  )
}

export default IssueBook