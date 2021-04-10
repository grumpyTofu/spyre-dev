import React, { useState } from 'react';
import { Link } from 'gatsby';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      background: 'transparent',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Navbar = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    active: false,
    navbarActiveClass: '',
  });

  const toggleHamburger = () => {
    // toggle the active boolean in the state
    setState({
      active: !state.active,
      navbarActiveClass: !state.active ? 'is-active' : '',
    });
  };

  return (
    <AppBar position="static" className={classes.appbar} elevation={0}>
      <Toolbar>
        <Link to="/" className="navbar-item" title="Logo">
          <Typography variant="h6" className={classes.title}>
            Spyre
          </Typography>
        </Link>
        <Link className="navbar-item" to="/about">
          About
        </Link>
        <Link className="navbar-item" to="/products">
          Products
        </Link>
        <Link className="navbar-item" to="/blog">
          Blog
        </Link>
        <Link className="navbar-item" to="/contact">
          Contact
        </Link>
        <Link className="navbar-item" to="/contact/examples">
          Form Examples
        </Link>
        <div
          className={`navbar-burger burger ${state.navbarActiveClass}`}
          data-target="navMenu"
        >
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => toggleHamburger()}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
