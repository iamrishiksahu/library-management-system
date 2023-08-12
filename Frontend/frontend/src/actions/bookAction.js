import axios from "axios"
import { API_BASE_URL } from "../utils/AppConstants"

const addBookAction = ({bookData, qty}) => {

    // bookID
    // title
// num_pages
// authors
// average_rating
// isbn

// isbn13

// language_code
// publication_date
// publisher
// ratings_count
// text_reviews_count

    console.log(bookData.title, qty);

    axios.post(`${API_BASE_URL}/books`, {
        bookID: bookData.bookID,
        title: bookData.title,
        authors: bookData.authors,
        average_rating: bookData.average_rating,
        isbn: bookData.isbn,
        language_code: bookData.language_code,
        publication_date: bookData.publication_date,
        publisher: bookData.publisher,
        text_reviews_count: bookData.text_reviews_count,
        ratings_count: bookData.ratings_count,
        isbn13: bookData.isbn13,
        pages: bookData["  num_pages"],
        qty: qty,

    }).then((res) => {
        if(res.data == 'SUCCESS'){
            alert("Book added successfully!")
        }
    }).catch((err) => {
        console.log(err);
    })
    
}

const returnBookAction = ({issueId, bookId}) => {
    
    axios.post(`${API_BASE_URL}/return`, {
        "issueId": issueId.toString(),
        "bookId": bookId.toString(),
    }).then((res) => {
        if(res.data == 'SUCCESS'){
            alert("Book returned successfully!")
        }
    }).catch((err) => {
        console.log(err);
    })
}


const issueBookAction = ({bookData, memberId}) => {
    console.log(bookData);
    axios.post(`${API_BASE_URL}/issue`, {
        "member_id": memberId,
        "book_id": bookData.bookId,
        "issued_at": Date.now()
    }).then((res) => {

        if(res.data == 'SUCCESS'){
            alert("Book issued successfully!")
        }else if(res.data == 'OVERDUE'){
            alert("OVERDUE")
        }
    }).catch((err) => {
        console.log(err);
    })
}

export {issueBookAction, returnBookAction, addBookAction}