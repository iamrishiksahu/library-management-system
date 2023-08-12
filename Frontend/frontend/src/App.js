import './App.css';
import { useEffect, useState } from 'react';
import TopAppBar from './components/TopAppBar/TopAppBar';
import {SIDEBAR_MENU_ENDPOINTS as sideMenuItems} from './utils/AppConstants'
import MenuItemContainer from './components/MenuItem/MenuItemContainer';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './components/mainComponents/Dashboard/Dashboard';
import Books from './components/mainComponents/Books/Books';
import Members from './components/mainComponents/Members/Members';
import AddMember from './components/mainComponents/Members/AddMember';
import Returned from './components/mainComponents/Returned/Returned'
import IssueBook from './components/mainComponents/IssueBook/IssueBook';
import NotReturned from './components/mainComponents/NotReturned/NotReturned';
import Payments from './components/mainComponents/Payments/Payments';
import AddBooks from './components/mainComponents/Books/AddBooks';


const App = () => {

  const [activeSideMenu, setActiveSideMenu] = useState('Dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const endpoint = sideMenuItems[activeSideMenu];
    navigate(endpoint)

  }, [activeSideMenu])
  

  return (
    <div className="app-main">
      <div className="app-bar-container">
        <TopAppBar />
      </div>

      <div className="app-main-container">
        <div className="sidebar">
          <MenuItemContainer active={activeSideMenu} setActive={setActiveSideMenu}/>

        </div>

        <div className="mainbar">

          <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/books' element={<Books/>} />
            <Route path='/members' element={<Members/>} />
            <Route path='/issued' element={<IssueBook/>} />
            <Route path='/returned' element={<Returned/>} />
            <Route path='/notreturned' element={<NotReturned/>} />
            <Route path='/payments' element={<Payments/>} />
            <Route path='/add-books' element={<AddBooks/>} />
            <Route path='/add-member' element={<AddMember/>} />
            <Route path='/issueBook' element={<IssueBook/>} />

          </Routes>

        </div>
      </div>


    </div>
  );
}

export default App;
