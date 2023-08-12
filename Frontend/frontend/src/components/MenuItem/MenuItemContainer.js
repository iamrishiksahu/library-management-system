import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ForwardIcon from '@mui/icons-material/Forward';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import MenuSingle from './MenuSingle';
import PaidIcon from '@mui/icons-material/Paid';

const MenuItemContainer = ({active, setActive}) => {
  return (
    <>

      
      <Divider />
      <MenuSingle active={active} setActive={setActive} title={"Dashboard"} icon={<DashboardIcon/>} />
      <MenuSingle active={active} setActive={setActive} title={"Members"} icon={<PeopleIcon/>} />
      <MenuSingle active={active} setActive={setActive} title={"Books"} icon={<CollectionsBookmarkIcon/>} />
      <MenuSingle active={active} setActive={setActive} title={"Issued"} icon={<ForwardIcon/>} />
      <MenuSingle active={active} setActive={setActive} title={"Returned"} icon={<KeyboardBackspaceIcon/>} />
      <MenuSingle active={active} setActive={setActive} title={"Not Returned"} icon={<PriorityHighIcon/>} />
      <MenuSingle active={active} setActive={setActive} title={"Payments"} icon={<PaidIcon/>} />
      
    </>
    //   </MenuList>
    // </Paper>


  )
}

export default MenuItemContainer;


