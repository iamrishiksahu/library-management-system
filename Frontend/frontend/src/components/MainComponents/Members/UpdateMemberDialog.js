import { Dialog, DialogTitle, Button, TextField, DialogContent } from '@mui/material';
import React, { useRef } from 'react'
import { updateMemberAction } from '../../../actions/memberAction';

const UpdateMemberDialog = ({ showDialog, setShowDialog, data, memberId, getAllMembers, setIsLoading }) => {

    const nameRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();

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