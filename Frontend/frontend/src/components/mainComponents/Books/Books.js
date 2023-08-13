import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../../utils/AppConstants'
import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Dialog, DialogTitle, DialogContent} from '@mui/material'
import Paper from '@mui/material/Paper';
import { issueBookAction } from '../../../actions/bookAction'

const columns = ['Book ID', 'Title', 'Authors', 'Rating', 'Stock', 'Language', 'Action']

let rowData = {}

const Books = () => {

  const [list, setlist] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const navigate = useNavigate()

  const memberIdRef = useRef()

  const handleDialog = () => {
    setShowDialog(!showDialog)
  }

  const handleIssueClick = ({ data }) => {

    rowData = data;
    console.log("rd", rowData)
    setShowDialog(true)

    // axios.get(`${API_BASE_URL}/issue`, {
    //   member_id: rowData.memberId,
    //   book_id: rowData.bookId
    // })

  }
  const getAllBooks = () => {

    axios.get(`${API_BASE_URL}/books`).then((res) => {
      console.log(res.data)
      setlist(res.data)
    }).catch((err) => {
      console.log(err)
    })

  }
  // const deleteAct = (item) => {
  //   alert(item)
  // }
  // const updateAct = (idx) => {
  //   alert("updateCalled")
  // }

  useEffect(() => {
    getAllBooks()
  }, [])

  return (
    <div className="component-main-container">

      <div className="component-title-bar">
        <h2 className="section-title">Books</h2>
        <Button variant='contained' size='small' onClick={() => navigate('/add-books')}>+ Add</Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((item, i) => {
                return (
                  <TableCell sx={{ fontWeight: '600' }}>{item}</TableCell>
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


                <TableCell >{row.bookId}</TableCell>
                <TableCell >{row.title}</TableCell>
                <TableCell >{row.authors}</TableCell>
                <TableCell >{row.avg_rating}</TableCell>
                <TableCell >{row.stock}</TableCell>
                <TableCell >{row.lang}</TableCell>
                <TableCell align='center' >
                  {row.is_returned ?
                    "Returned"
                    : <Button onClick={() => handleIssueClick({ data: row })} >Issue</Button>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog onClose={handleDialog} open={showDialog}>
        <DialogTitle>Issue Book</DialogTitle>
        <DialogContent sx={{ gap: "1rem", display: 'flex' }}>
          <TextField variant='outlined' size='small' placeholder='Member ID' type='number' inputRef={memberIdRef} />
          <Button onClick={() => issueBookAction({ bookData: rowData, memberId: memberIdRef.current.value })} variant='contained' >Issue</Button>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default Books