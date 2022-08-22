
import React, { useState,useEffect  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { MenuBook } from '@mui/icons-material';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import { deepOrange, deepPurple } from '@mui/material/colors';


//import ModalDialog from './ModalDialog';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
    //flexgrow: 1
  },
  title: {
    flexGrow: 1,
  },
  btn_login:{
    flexGrow: 1,
    flexDirection:'row-reverse'
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
     

      
      <List>
          <ListItem key={'credito'} disablePadding>
          <Link href="/protected">
            <ListItemButton>
              <ListItemIcon>
                 <InboxIcon /> 
              </ListItemIcon>
              <ListItemText primary={'Protected Page'} />
            </ListItemButton>
            </Link>
          </ListItem>
      
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
          
        ))}
      </List>
    </Box>
  );

  const { data: session } = useSession();

  useEffect(() => {
    if (session == null) return;
    console.log('session.jwt', session.jwt);
    console.log('session.user', session.user);

  }, [session]);

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="sticky" style={{top:'0px', zIndex: 1}}>
      <Toolbar>
      {session ? (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
        >
          <MenuBook onClick={toggleDrawer('left', true)} />
          <SwipeableDrawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </IconButton>
        ) : ( <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
        >
          <MenuBook/>
         
        </IconButton>)}

        <Typography variant="h6" component="div" className={classes.title} style={{ flexGrow: 1 }} >
          Money Exchange 
        </Typography>
       

        {session ? (
         <div style={{ display: 'inherit'}}> 
     

        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
    
      <Avatar sx={{ bgcolor: 'white', color: '#3f51b5', fontWeight:'bold' }} >{session.user.name.charAt(0)}</Avatar>
      </IconButton>
            </Tooltip>
    <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={anchorElUser}
              onClose={handleCloseUserMenu}
            >
              
                <MenuItem key={'Logout'} onClick={signOut}>
                  <Typography textAlign="center" variant="h7" component="div" >Logout</Typography>
                </MenuItem>
            
            </Menu>
            </Box>
    </div>
    
      ) : (
        
        <Link href="/auth/sign-in" color="inherit">
        <Button color="inherit">
        Sign In
        </Button>
        </Link>
        
      )}
       
      </Toolbar>
    
    </AppBar>
    </Box>
  );
};

export default Navbar;