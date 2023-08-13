import React, {useEffect, useState} from 'react'
// import Table from '../../CustomTable/Table'
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

const columns = ['Issue ID', 'Title', 'Issued To', 'Issued On']


const NotReturned = () => {

  const [list, setList] = useState([])
  const navigate = useNavigate()
  const getAllNotReturned = () => {

    axios.get(`${API_BASE_URL}/not-returned`).then((res) => {
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
    alert("updateCalled")
  }

  useEffect(() => {
    getAllNotReturned()
  }, [])

  return (
    <div className="component-main-container">

      <div className="component-title-bar">
        <h2 className="section-title">Not Returned</h2>
       
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

                
                <TableCell >{row.issueId}</TableCell>
                <TableCell >{row.title}</TableCell>
                <TableCell >{row.full_name}</TableCell>
                <TableCell >{row.issued_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>



    </div>
  )
}

export default NotReturned