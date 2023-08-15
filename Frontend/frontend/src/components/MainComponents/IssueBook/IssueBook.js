import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../../utils/AppConstants'
import { Button, LinearProgress } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { returnBookAction } from '../../../actions/bookAction'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import { recordPayment } from '../../../actions/paymentAction';


const columns = ['Issue ID', 'Book Title', 'Member Name', 'Issued On']

const IssueBook = () => {
  const [list, setList] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [showDialog, setShowDialog] = useState(false)
  const [currIssue, setcurrIssue] = useState({})

  const handleReturnClick = ({ data }) => {
    setcurrIssue(data)
    setShowDialog(true)

  }

  const createBookReturn = async () => {
    setisLoading(true)
    const res = await returnBookAction({ bookId: currIssue.bookId, issueId: currIssue.issueId })
    const payRes = await recordPayment({ issueId: currIssue.issueId, amount: "100" })
    //todo: consider payRes as well for returning success 
    
    if (res == 'SUCCESS') {
      alert('Book Returned Successfully')
      getAllIssues()
    }
    setShowDialog(false)
    setisLoading(false)
  }

  const getAllIssues = () => {
    axios.get(`${API_BASE_URL}/issue`).then((res) => {
      setList(res.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setisLoading(false)
    })
  }

  useEffect(() => {
    getAllIssues()
  }, [])

  return (
    <div className="component-main-container">

      <div className="component-title-bar">
        <h2 className="section-title">Issued Books</h2>
      </div>
      {isLoading ?
        <LinearProgress />
        :
        list.length > 0 ?
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((item, i) => {
                    return (
                      <TableCell sx={{ fontWeight: '600' }}>{item}</TableCell>
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
                      {row.is_returned ?
                        "Returned"
                        : <Button onClick={() => handleReturnClick({ data: row })} >Return</Button>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          : <p>No Data Available!</p>
      }

      <Dialog onClose={() => setShowDialog(false)} open={showDialog}>

        <DialogTitle>Return Book</DialogTitle>
        <DialogContent sx={{}}>
          <p>Total rent of this issue is Rs. 100.<br />Is Payment Received?</p>

          <Button onClick={() => createBookReturn()} variant='contained' >Yes, Received</Button>
        </DialogContent>
      </Dialog>


    </div>
  )
}
export default IssueBook