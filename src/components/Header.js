import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import history from '../routes/history';

import * as GeneralActions from '../store/general';

import '../styles/components/Header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const mobileOpen = useSelector((state) => state.general.mobileOpen);

  const handleDrawerToggle = () => {
    dispatch(GeneralActions.setMobileOpen(!mobileOpen));
  };
  return (
    <div className="header-component">
      <AppBar position="fixed" className="app-bar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className="menu-button"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
                        Robótica Educacional
          </Typography>
          <div className="section-desktop">
           
            
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
