import axios from "axios";
import { API_BASE_URL } from "../utils/AppConstants";

const recordPayment = async ({issueId, amount}) => {
    try{
        const res = await axios.post(`${API_BASE_URL}/transactions`, {
            "amount" : amount,
            "issueId": issueId
        })
        console.log("rec payment res: ", res.data) //to remove
        return res.data
    }catch(err) {
        console.log(err);
    }
}

export {recordPayment}