import { Dialog, DialogTitle, Button, TextField, DialogContent } from '@mui/material';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../utils/AppConstants';
import axios from 'axios';
import { updateMemberAction } from '../../../actions/memberAction';



const UpdateMemberDialog = ({ showDialog, setShowDialog, data, memberId, getAllMembers, setIsLoading }) => {

    const nameRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();
    const navigate = useNavigate()

    const handleUpdateClick = async () => {
        setIsLoading(true)
        const res = await updateMemberAction({
            fields: {
                full_name: nameRef.current.value,
                phone: phoneRef.current.value,
                address: addressRef.current.value
            },
            memberID: data.member_id,
        })
        if (res == "SUCCESS") {
            alert("Member updated successfully!")
            getAllMembers()
        } else {
            alert(res)
        }
        setIsLoading(false)
        setShowDialog(false)
    }

    const updateMember = () => {
        axios.patch(`${API_BASE_URL}/members`, {
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
        }).finally(() => {
            setShowDialog(false)
        })
    }
    return (
        <Dialog onClose={() => setShowDialog(false)} open={showDialog}>

            <DialogTitle>Update Member</DialogTitle>
            <DialogContent sx={{ gap: "1rem", display: 'flex' }}>
                <TextField size='small' variant='outlined' placeholder={'Full Name'} inputRef={nameRef} defaultValue={data.full_name} />
                <TextField size='small' variant='outlined' type='number' placeholder={'Phone'} inputRef={phoneRef} defaultValue={data.phone} />
                <TextField size='small' variant='outlined' placeholder={'Address'} inputRef={addressRef} defaultValue={data.address} />
                <Button variant='contained' onClick={handleUpdateClick}>Update</Button>
            </DialogContent>
        </Dialog >


    )
}

export default UpdateMemberDialog