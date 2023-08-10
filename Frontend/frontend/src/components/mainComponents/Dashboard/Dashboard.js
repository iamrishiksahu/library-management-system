import React from 'react'
import Card from './Cards/Card';
import "./Dashboard.css"
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const books = 1012;
  const members = 202;
  const issued = 100;
  const pendingReturn = 10;
  const income = 11000;
  const navigate = useNavigate();

  return (
    <div className="dashboard-main-container">
      <div className="dashboard-card-container">

        <Card
          title={"Books"}
          count={books}
          icon={<></>}
          bgColor={"#000000"} />
        <Card
          title={"Members"}
          count={members}
          icon={<></>}
          bgColor={"#87e"} />
        <Card
          title={"Issued"}
          count={issued}
          icon={<></>}
          bgColor={"#34f"} />
        <Card
          title={"Pending Return"}
          count={pendingReturn}
          icon={<></>}
          bgColor={"#e34"} />
        <Card
          title={"Total Income"}
          count={income}
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