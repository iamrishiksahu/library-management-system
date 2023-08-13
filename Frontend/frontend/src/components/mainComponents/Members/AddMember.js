import { Box, Button, TextField } from '@mui/material'
import React, { useRef } from 'react'
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/AppConstants';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const AddMember = () => {
    const nameRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();
    const navigate = useNavigate()

    const addMember = () => {
        axios.post(`${API_BASE_URL}/members`, {
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            address: addressRef.current.value
        }).then((res) => {
            if (res.data == 'SUCCESS') {
                navigate('/members')
            } else {
                alert("Something went wrong!")
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="component-main-container">

            <div className="component-title-bar">
                <IconButton onClick={(e) => { e.preventDefault(); navigate('/members') }} size="medium">
                    <ArrowBackIcon fontSize="inherit" />
                </IconButton>
                <h2 className="section-title">Add Member</h2>

            </div>

            <div className="component-subcontainer">
                <TextField size='small' variant='outlined' placeholder={'Full Name'} inputRef={nameRef} />
                <TextField size='small' variant='outlined' type='number' placeholder={'Phone'} inputRef={phoneRef} />
                <TextField size='small' variant='outlined' placeholder={'Address'} inputRef={addressRef} />
                <Button variant='contained' onClick={addMember}>Add Member</Button>

            </div>

        </div>
    )
}

export default AddMember