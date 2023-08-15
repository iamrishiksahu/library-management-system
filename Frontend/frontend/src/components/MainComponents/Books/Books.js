import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../../utils/AppConstants'
import { Button, IconButton, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table';
import Rating from '@mui/material/Rating';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import Paper from '@mui/material/Paper';
import { deleteBookAction, issueBookAction, qtyUpdateAction } from '../../../actions/bookAction'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LinearProgress from '@mui/material/LinearProgress'

const columns = ['Book ID', 'Title', 'Authors', 'Rating', 'Stock', 'Publisher', 'ISBN']

let rowData = {}
let dialogAction = ''

const Books = () => {

  const [list, setlist] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [showDialog, setShowDialog] = useState(false)
  const navigate = useNavigate()

  const memberIdRef = useRef()
  const cnfBookIdRef = useRef()
  const newQtyRef = useRef()

  const handleDialog = () => {
    setShowDialog(!showDialog)
  }

  const handleCnfBookDelete = async ({ data }) => {
    if (cnfBookIdRef.current.value == data.bookId) {
      const res = await deleteBookAction({ bookId: data.bookId })
      if (res == 'SUCCESS') {
        setShowDialog(false)
        getAllBooks()
      }
    }
    else alert('Book ID not matched!')
  }

  const handleQtyUpdate = async ({ rowData }) => {

    const res = await qtyUpdateAction({ qty: newQtyRef.current.value, bookId: rowData.bookId })
    if (res == 'SUCCESS') {
      setShowDialog(false)
      getAllBooks()

    }
  }

  const handleIssueClick = ({ data, action }) => {

    rowData = data;
    dialogAction = action
    getAllBooks()
    setShowDialog(true)

  }
  const getAllBooks = () => {

    axios.get(`${API_BASE_URL}/books`).then((res) => {

      setlist(res.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setisLoading(false)
    })

  }

  useEffect(() => {
    getAllBooks()
  }, [])

  return (
    <div className="component-main-container">

      <div className="component-title-bar">
        <h2 className="section-title">Books</h2>
        <Button variant='contained' size='small' onClick={() => navigate('/add-books')}>+ Add</Button>
      </div>

      {isLoading ?
        <LinearProgress />
        :

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((item, i) => {
                  return (
                    <TableCell sx={{ fontWeight: '600' }}>{item}</TableCell>
                  )
                })}
                <TableCell align='center' width='200px' sx={{ fontWeight: '600' }}>Actions</TableCell>


              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >


                  <TableCell sx={{width: '90px'}} >{row.bookId}</TableCell>
                  <TableCell >{row.title}</TableCell>
                  <TableCell >{row.authors}</TableCell>
                  <TableCell ><Rating name="read-only" value={parseFloat(row.avg_rating)} readOnly precision={0.2} /></TableCell>
                  <TableCell >{row.stock}</TableCell>
                  <TableCell >{row.publisher}</TableCell>
                  <TableCell >{row.isbn}</TableCell>
                  <TableCell align='center' >

                    <Button onClick={() => handleIssueClick({ data: row, action: 'ISSUE' })} >Issue</Button>

                    <IconButton onClick={() => handleIssueClick({ data: row, action: 'DELETE' })} >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleIssueClick({ data: row, action: 'UPDATE' })}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }

      <Dialog onClose={handleDialog} open={showDialog}>

        {dialogAction === 'ISSUE' ?
          <>

            <DialogTitle>Issue Book</DialogTitle>
            <DialogContent sx={{ gap: "1rem", display: 'flex' }}>
              <TextField variant='outlined' size='small' placeholder='Member ID' type='number' inputRef={memberIdRef} />
              <Button onClick={async () => {await issueBookAction({ bookData: rowData, memberId: memberIdRef.current.value }); setShowDialog(false)}} variant='contained' >Issue</Button>
            </DialogContent>
          </>
          : dialogAction === 'DELETE' ?
            <>
              <DialogTitle>Delete Book</DialogTitle>
              <DialogContent sx={{ gap: "1rem", display: 'flex' }}>
                <TextField variant='outlined' size='small' placeholder='Confirm Book ID' type='number' inputRef={cnfBookIdRef} />
                <Button
                  onClick={() => handleCnfBookDelete({ data: rowData })} variant='contained' >Confirm Delete</Button>
              </DialogContent>
            </>
            : dialogAction === 'UPDATE' ?
              <>
                <DialogTitle>Update Quantity</DialogTitle>
                <DialogContent sx={{ gap: "1rem", display: 'flex' }}>
                  <TextField variant='outlined' size='small' placeholder='New quantity' type='number' inputRef={newQtyRef} />
                  <Button
                    onClick={() => {
                      handleQtyUpdate({ rowData: rowData })
                    }
                    } variant='contained' >Update</Button>
                </DialogContent>
              </>
              : <></>

        }


      </Dialog>

    </div>



  )
}

export default Books