import './App.css';
import { useEffect, useState } from 'react';
import TopAppBar from './components/TopAppBar/TopAppBar';
import {SIDEBAR_MENU_ENDPOINTS as sideMenuItems} from './utils/AppConstants'
import MenuItemContainer from './components/MenuItem/MenuItemContainer';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './components/MainComponents/Dashboard/Dashboard';
import Books from './components/MainComponents/Books/Books';
import Members from './components/MainComponents/Members/Members';
import AddMember from './components/MainComponents/Members/AddMember';
import Returned from './components/MainComponents/Returned/Returned'
import IssueBook from './components/MainComponents/IssueBook/IssueBook';
import NotReturned from './components/MainComponents/NotReturned/NotReturned';
import Payments from './components/MainComponents/Payments/Payments';
import AddBooks from './components/MainComponents/Books/AddBooks';

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
            <Route path='/' element={<Dashboard setActive={setActiveSideMenu}/>} />
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
