import React, { useEffect, useState } from 'react'
import Card from './Cards/Card';
import "./Dashboard.css"
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/AppConstants';
import PeopleIcon from '@mui/icons-material/People';



const Dashboard = ({ setActive }) => {

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

      <h2>Library Summary</h2>
      <div className="dashboard-card-container">

        <Card
          title={"Books"}
          count={dashData.books}
          icon={PeopleIcon}
          bgColor={"#f39c11"} />
        <Card
          title={"Members"}
          count={dashData.members}
          icon={<></>}
          bgColor={"#87e"} />
        <Card
          title={"Issued"}
          count={dashData.issued}
          icon={<></>}
          bgColor={"#4f5be0"} />
        <Card
          title={"Pending Return"}
          count={dashData.pendingReturn}
          icon={<></>}
          bgColor={"#e34"} />
        <Card
          title={"Total Income"}
          count={dashData.income}
          icon={<></>}
          bgColor={"#00a65a"} />
      </div>


      <h2>Quick Actions</h2>

      <div className="dashbaord-actions-container">
        <Button
          onClick={() => {
            navigate('/books'); setActive('Books')
          }}
          variant='outlined'>
          Issue Book
        </Button>
        <Button
          onClick={() => {
            navigate('/issued'); setActive('Issued')
          }}
          variant='outlined'>
          Return Book
        </Button>
        <Button
          onClick={async () => {
            await setActive('Members');
            navigate('/add-member'); 
          }}
          variant='outlined'>
          Add Member
        </Button>

        <Button
          onClick={async () => {
            await setActive('Books');
            navigate('/add-books'); 
          }}
          variant='outlined'>
          Add Books
        </Button>


      </div>



    </div>

  )
}

export default Dashboard