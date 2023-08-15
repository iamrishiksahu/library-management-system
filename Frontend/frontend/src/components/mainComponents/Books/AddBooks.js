import { Button, DialogContent, LinearProgress, TablePagination, TextField } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import "./AddBooks.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { API_BASE_URL } from '../../../utils/AppConstants';
import { addBookAction } from '../../../actions/bookAction';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const columns = ['Book ID', 'Title', 'Authors', 'Rating', 'Pages', 'Publisher', 'ISBN']

const AddBooks = () => {

    const [list, setList] = useState([]);
    const [currBook, setCurrBook] = useState({})
    const [isLoading, setisLoading] = useState(true)


    const [openDialoge, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    const authorRef = useRef();
    const titleRef = useRef();
    const qtyRef = useRef();

    const handleDialog = () => {
        setOpenDialog(!openDialoge)
    }

    const handleAddBookClick = async ({ bookData }) => {
        setOpenDialog(true)
        await setCurrBook(bookData)
        console.log(currBook);
    }

    const handleAddButtonClick = async () => {
        setisLoading(true)
        try {

            const res = await addBookAction({ bookData: currBook, qty: qtyRef.current.value })
            if (res == 'SUCCESS') {
                setOpenDialog(false);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setisLoading(false)
        }
    }

    const searchBookByTitle = () => {
        setisLoading(true)
        axios.get(`${API_BASE_URL}/books/search-book/title?value=${titleRef.current.value}`)
            .then((res) => {
                setList(res.data?.message)
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setisLoading(false)
            })
    }
    const searchBookByAuthor = () => {
        setisLoading(true)

        axios.get(`${API_BASE_URL}/books/search-book/author?value=${authorRef.current.value}`)
            .then((res) => {
                setList(res.data?.message)
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setisLoading(false)
            })
    }

    const getInitialData = () => {
        axios.get(`${API_BASE_URL}/books/search-book/all`)
            .then((res) => {
                setList(res.data?.message)
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setisLoading(false)
            })

    }


    useEffect(() => {
        getInitialData()
    }, [])

    return (
        <div className="component-main-container">

            <div className="component-title-bar">
                <IconButton onClick={(e) => { e.preventDefault(); navigate('/books') }} size="medium">
                    <ArrowBackIcon fontSize="inherit" />
                </IconButton>
                <h2 className="section-title">Add New Books To Library</h2>

            </div>

            <div className="search-options-container">
                <div className="search-left">

                    <TextField variant='outlined' size='small' placeholder='Enter title...' inputRef={titleRef}></TextField>
                    <Button variant='contained' onClick={searchBookByTitle}>Search by Title</Button>


                </div>
                <div className="search-right">

                    <TextField variant='outlined' inputRef={authorRef} size='small' placeholder='Enter author...'></TextField>
                    <Button variant='contained' onClick={searchBookByAuthor}  >Search by Author</Button>

                </div>
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
                                <TableCell align='center'>Actions</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{ width: '90px' }} >{row.bookID}</TableCell>
                                    <TableCell >{row.title}</TableCell>
                                    <TableCell >{row.authors}</TableCell>
                                    <TableCell ><Rating name="read-only" value={parseFloat(row.average_rating)} readOnly precision={0.2} /></TableCell>
                                    <TableCell >{row["  num_pages"]}</TableCell>
                                    <TableCell >{row.publisher}</TableCell>
                                    <TableCell >{row.isbn}</TableCell>
                                    <TableCell align='center' >
                                        <Button onClick={() => handleAddBookClick({ bookData: row })}> +ADD </Button>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            }

            <Dialog onClose={handleDialog} open={openDialoge}>
                <DialogTitle>Add Book</DialogTitle>
                <DialogContent sx={{ gap: "1rem", display: 'flex' }}>
                    <TextField variant='outlined' size='small' placeholder='Quantity' type='number' inputRef={qtyRef} />
                    <Button onClick={() => handleAddButtonClick()} variant='contained' >Add</Button>
                </DialogContent>
            </Dialog>



        </div>
    )
}

export default AddBooks