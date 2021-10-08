import React from 'react';
import logo from "../../components/Image/agua.png";
import {ShoppingCart} from '@material-ui/icons';
import useStyles from './styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import{Link, useLocation} from 'react-router-dom'




const Navbar =({totalItem})=> {

  const classes = useStyles();
  const location = useLocation();
  
 
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
        <IconButton component={Link} to="/">
          <img src={logo}  alt="aguaPlanta." height="22px" className={classes.image} />
          </IconButton>
            <div className={classes.grow} />
          <div className={classes.grow} />

         {location.pathname === "/" && (<div className={classes.button}>
                <IconButton component={Link} to="/cart" aria-label="show cart Items" color="inherit">
                    <Badge badgeContent={totalItem} color="secondary">
                        <ShoppingCart />
                    </Badge>
                    </IconButton> 
            </div>)}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;