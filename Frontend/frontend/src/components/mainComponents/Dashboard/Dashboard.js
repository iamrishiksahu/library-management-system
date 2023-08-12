import React, { useEffect, useState } from 'react'
import Card from './Cards/Card';
import "./Dashboard.css"
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/AppConstants';
const Dashboard = () => {
  const books = 1012;
  const members = 202;
  const issued = 100;
  const pendingReturn = 10;
  const income = 11000;

  const [dashData, setDashData] = useState({})

  const navigate = useNavigate();

  const fetchDashboardData = () => {
    axios.get(`${API_BASE_URL}/dashboard`)
    .then((res) => {
      const data = res.data
      console.log(data)
      const obj = {
        books: data.books[0][0],
        members: data.members[0][0],
        issued: data.issued[0][0],
        pendingReturn: data.not_returned[0][0],
        income: data.earnings[0][0]
      }
      setDashData(obj)

    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    fetchDashboardData();
  }, [])

  return (
    <div className="dashboard-main-container">
      <div className="dashboard-card-container">

        <Card
          title={"Books"}
          count={dashData.books}
          icon={<></>}
          bgColor={"#000000"} />
        <Card
          title={"Members"}
          count={dashData.members}
          icon={<></>}
          bgColor={"#87e"} />
        <Card
          title={"Issued"}
          count={dashData.issued}
          icon={<></>}
          bgColor={"#34f"} />
        <Card
          title={"Pending Return"}
          count={dashData.pendingReturn}
          icon={<></>}
          bgColor={"#e34"} />
        <Card
          title={"Total Income"}
          count={dashData.income}
          icon={<></>}
          bgColor={"#7a6"} />




      </div>

      <div className="dashbaord-actions-container">
        <Button
        onClick={() => navigate('/issueBook')}
        variant='contained'>
          Issue Book
        </Button>
        <Button
        variant='contained'>
          Return Book
        </Button>
        <Button
        variant='contained'>
          Add Member
        </Button>

      </div>

    </div>

  )
}

export default Dashboard