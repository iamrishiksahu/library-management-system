import './App.css';
import { useEffect, useState } from 'react';
import TopAppBar from './components/TopAppBar/TopAppBar';
import {SIDEBAR_MENU_ENDPOINTS as sideMenuItems} from './utils/AppConstants'
import MenuItemContainer from './components/MenuItem/MenuItemContainer';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './components/mainComponents/Dashboard/Dashboard';
import Books from './components/mainComponents/Books/Books';
import IssueBook from './components/mainComponents/IssueBook/IssueBook';
import Members from './components/mainComponents/Members/Members';
import AddMember from './components/mainComponents/Members/AddMember';


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
            <Route path='/add-member' element={<AddMember/>} />
            <Route path='/issueBook' element={<IssueBook/>} />

          </Routes>

        </div>
      </div>


    </div>
  );
}

export default App;
