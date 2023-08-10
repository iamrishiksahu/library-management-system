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
import MenuSingle from './MenuSingle';

const MenuItemContainer = ({active, setActive}) => {
  return (
    <>

      
      <Divider />
      <MenuSingle active={active} setActive={setActive} title={"Dashboard"} icon={<Cloud/>} />
      <MenuSingle active={active} setActive={setActive} title={"Members"} icon={<Cloud/>} />
      <MenuSingle active={active} setActive={setActive} title={"Books"} icon={<Cloud/>} />
      <MenuSingle active={active} setActive={setActive} title={"Issued"} icon={<Cloud/>} />
      <MenuSingle active={active} setActive={setActive} title={"Returned"} icon={<Cloud/>} />
      <MenuSingle active={active} setActive={setActive} title={"Not Returned"} icon={<Cloud/>} />
      <MenuSingle active={active} setActive={setActive} title={"Payments"} icon={<Cloud/>} />
      
    </>
    //   </MenuList>
    // </Paper>


  )
}

export default MenuItemContainer;


