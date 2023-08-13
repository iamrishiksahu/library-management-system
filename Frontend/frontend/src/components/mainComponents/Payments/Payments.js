import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../../utils/AppConstants'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const columns = ['Transaction ID', 'Date' ,'Amount' , 'Book', 'Member']


const Payments = () => {

  const [list, setList] = useState([])

  const getAllPayments = () => {

    axios.get(`${API_BASE_URL}/transactions`).then((res) => {
      console.log(res.data)
      setList(res.data)
    }).catch((err) => {
      console.log(err)
    })

  }


  useEffect(() => {
    getAllPayments()
  }, [])

  return (
    <div className="component-main-container">

      <div className="component-title-bar">
        <h2 className="section-title">All Payments</h2>
        
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

                
                <TableCell >{row.transaction_id}</TableCell>
                <TableCell >{row.tnx_date}</TableCell>
                <TableCell >{row.amount}</TableCell>
                <TableCell >{row.title}</TableCell>
                <TableCell >{row.full_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


    </div>
  )
}

export default Payments