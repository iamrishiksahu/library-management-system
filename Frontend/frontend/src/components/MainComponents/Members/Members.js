import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../../utils/AppConstants'
import { Button, IconButton } from '@mui/material'
import "./Members.css"
import { useNavigate } from 'react-router-dom'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import UpdateMemberDialog from './UpdateMemberDialog'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteMemberAction } from '../../../actions/memberAction'

const Members = () => {
  const columns = ["Member ID", "Full Name", "Address", "Phone", "Joined"]
  const [list, setlist] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [rowData, setrowData] = useState({})
  const [showUpdateDialog, setshowUpdateDialog] = useState(false)

  const navigate = useNavigate();

  const deleteMember = async (item) => {
    setisLoading(true)
    const res = await deleteMemberAction({ memberId: item.member_id })
    if (res == 'SUCCESS') {
      alert('Member Deleted Successfully!')
      getAllMembers()
    } else {
      alert('Some error occured')
      console.log("error:", res)
    }
    setisLoading(false)
  }

  const getAllMembers = () => {
    setisLoading(true)
    axios.get(`${API_BASE_URL}/members`).then((res) => {
      console.log(res.data)
      setlist(res.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setisLoading(false)
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
                  <TableCell align='center' sx={{ fontWeight: '600' }}>{'Actions'}</TableCell>


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
                    <TableCell sx={{ display: 'flex', gap: '1rem' }}><IconButton onClick={() => { setshowUpdateDialog(true); setrowData(row) }}>
                      <EditIcon />
                    </IconButton>
                      <IconButton onClick={(e) => { e.preventDefault(); deleteMember(row) }}>
                        <DeleteIcon />
                      </IconButton></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          : <p>No Data Available!</p>
      }

      <UpdateMemberDialog showDialog={showUpdateDialog} setShowDialog={setshowUpdateDialog} data={rowData} getAllMembers={getAllMembers} setIsLoading={setisLoading} />
    </div>
  )
}

export default Members