import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../../utils/AppConstants'
import { useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';

const columns = ['Issue ID', 'Book Title', 'Full Name', 'Returned At']

const Returned = () => {

  const [list, setList] = useState([])
  const [isLoading, setisLoading] = useState(true)

  const getAllBooks = () => {

    axios.get(`${API_BASE_URL}/return`).then((res) => {
      console.log(res.data)
      setList(res.data)
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
        <h2 className="section-title">Returned Books</h2>
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
                    <TableCell >{row.returned_at}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          : <p>No Data Available!</p>
      }


    </div>
  )
}

export default Returned