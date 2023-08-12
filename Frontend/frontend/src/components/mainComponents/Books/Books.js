import React, {useEffect, useState} from 'react'
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

const columns = ['Book ID', 'Title', 'Authors', 'Rating', 'Stock', 'Language']


const Books = () => {

  const [list, setlist] = useState([])
  const navigate = useNavigate()
  const getAllBooks = () => {

    axios.get(`${API_BASE_URL}/books`).then((res) => {
      console.log(res.data)
      setlist(res.data)
    }).catch((err) => {
      console.log(err)
    })

  }
  const deleteAct = (item) => {
    alert(item)
  }
  const updateAct = (idx) => {
    alert("updateCalled")
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

                
                <TableCell >{row.bookId}</TableCell>
                <TableCell >{row.title}</TableCell>
                <TableCell >{row.authors}</TableCell>
                <TableCell >{row.avg_rating}</TableCell>
                <TableCell >{row.stock}</TableCell>
                <TableCell >{row.lang}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}

export default Books