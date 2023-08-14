import axios, { AxiosError } from "axios"
import { API_BASE_URL } from "../utils/AppConstants"
import { useNavigate } from "react-router-dom"

const qtyUpdateAction = async ({ qty, bookId }) => {

    try {

        const res = await axios.patch(`${API_BASE_URL}/books`, {
            "bookId": bookId,
            "qty": qty
        })
        if (res.data === 'SUCCESS') {
            alert('Quantity Updated Successfully!')
            return res.data
        } else {
            alert(res.data)
        }


    } catch (err) {
        console.log(err)
    }

}

const deleteBookAction = async ({ bookId }) => {

    try {

        const res = await axios.delete(`${API_BASE_URL}/books?id=${bookId}`)
        if (res.data === 'SUCCESS') {
            alert('Book Deleted Successfully!')
            return res.data
        } else {
            alert(res.data)
        }
    }
    catch (err) {
        console.log(err)
    }
}

const addBookAction = async ({ bookData, qty }) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/books`, {
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

        })

        if (res.data == 'SUCCESS') {
            alert("Book added successfully!")
        }
        console.log(res.data);
        return res.data
    }
    catch (err) {
        console.log(err);
    }
}

const returnBookAction = async ({ issueId, bookId }) => {

    try {
        const res = await axios.post(`${API_BASE_URL}/return`, {
            "issueId": issueId.toString(),
            "bookId": bookId.toString(),
        })

        return res.data
    }
    catch (err) {
        console.log(err);
    }
}


const issueBookAction = async ({ bookData, memberId }) => {
    console.log(bookData);
    await axios.post(`${API_BASE_URL}/issue`, {
        "member_id": memberId,
        "book_id": bookData.bookId,
        "issued_at": Date.now()
    }).then((res) => {

        if (res.data === 'SUCCESS') {
            alert("Book issued successfully!")
        } else if (res.data === 'OVERDUE') {
            alert("Oops! Member has due of more than Rs. 500/-")
        }
    }).catch((err) => {
        console.log(err);
    })
}

export { issueBookAction, returnBookAction, addBookAction, deleteBookAction, qtyUpdateAction }