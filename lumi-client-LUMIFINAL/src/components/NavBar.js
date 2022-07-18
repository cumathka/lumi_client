import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Menu } from '@mui/material';
import { Tooltip } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import  {useTranslation} from 'react-i18next'
import "../translations/i18n"
import LOGO from '../assets/LUMI.png'
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import WebhookIcon from '@mui/icons-material/Webhook';
import { useState } from 'react';
const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
export default function Navbar({children}) {
  const[isFullScreen,setIsFullScreen] = useState(false)
  function getBrowserFullscreenElementProp() {
    if (typeof document.fullscreenElement !== "undefined") {
      return "fullscreenElement"
    } else if (typeof document.mozFullScreenElement !== "undefined") {
      return "mozFullScreenElement"
    } else if (typeof document.msFullscreenElement !== "undefined") {
      return "msFullscreenElement"
    } else if (typeof document.webkitFullscreenElement !== "undefined") {
      return "webkitFullscreenElement"
    } else {
      throw new Error("fullscreenElement is not supported by this browser")
    }
  }
  function toggleFullScreen() {
    getBrowserFullscreenElementProp()
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setIsFullScreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false)
      }
    }
  }
  const history = useNavigate();
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState(null);
  const openAvatar = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });
  const { t } = useTranslation();
    const menuItems = [
        { 
          text: t('navbarHome'), 
          icon: <HomeIcon color="secondary" />, 
          path: '/' 
        },
        { 
          text: t('navbarPlay'), 
          icon: <PlayArrowIcon color="secondary" />, 
          path: '/browsequizzes' 
        },
        { 
          text: t('navbarCreate'), 
          icon: <CreateIcon color="secondary" />, 
          path: '/create' 
        },
        { 
          text: t('Lumi'), 
          icon: <WebhookIcon color="secondary" />, 
          path: '/about' 
        },
        { 
          text: t('navbarSetting'), 
          icon: <SettingsIcon color="secondary" />, 
          path: '/settings' 
        },
      ];
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}>
            <MenuIcon />
          </IconButton>
          <Toolbar variant="h6"  component="div" sx={{flexGrow:1}}>
          <IconButton onClick={() => location.pathname === '/' ? history('/about') : history('/')}>
          <Avatar  alt="Example Alt" src={LOGO} sx={{ width:'100px'}}/>
          </IconButton>
          </Toolbar>
          <>
      <Box >
      <IconButton aria-label="fingerprint" sx={{color:'white'}} onClick={() => toggleFullScreen()}>
     <FullscreenIcon />
</IconButton>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={openAvatar ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openAvatar ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 } }  src={ isAuthenticated ?  user.picture :  '' }> <AccountCircleIcon /></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openAvatar}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem>
          {!isAuthenticated && (
      <Button
        onClick={() => loginWithRedirect()}>
       {t('logIn')}
      </Button>)}
        </MenuItem>
        {isAuthenticated && (
            <div>
               <MenuItem onClick={() => navigate('/settings')}>
               <Avatar
              src={user.picture}
              alt="Profile"/>
              {user.name}
        </MenuItem>
        <Divider />
            
        <MenuItem   onClick={() => logoutWithRedirect()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon >
          {t('logout')}
        </MenuItem>
        </div>     
            )}
      </Menu>
    </>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              onClick={() => history(item.path)}
              sx={{  backgroundColor: 'white',
              ...(location.pathname === item.path  && {
                color: '#d6a436' ,
          }),}}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}