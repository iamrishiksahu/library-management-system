import axios from "axios"
import { API_BASE_URL } from "../utils/AppConstants"

const deleteMemberAction = async ({ memberId }) => {
    try {

        const res = await axios.delete(`${API_BASE_URL}/members?del=${memberId}`)
        console.log(res.data)
        return res.data

    } catch (err) {
        console.log(err);
    }
}

const updateMemberAction = async ({ memberID, fields }) => {

    try {

        const res = await axios.patch(`${API_BASE_URL}/members`, {
            memberId: memberID,
            full_name: fields.full_name,
            phone: fields.phone,
            address: fields.address
        })
        if (res.data == 'SUCCESS') {

            return res.data
        }
        return res.data
    } catch (err) {
        console.log(err);
    }


}

export { updateMemberAction, deleteMemberAction }