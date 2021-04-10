import React, { useState } from 'react';
import { Link } from 'gatsby';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      background: 'transparent',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: 'black',
    },
    title: {
      flexGrow: 1,
    },
    spacer: {
      flexGrow: 1,
    },
  })
);

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();

  const collapsed = !useMediaQuery(theme.breakpoints.up('md'));

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <AppBar position="static" className={classes.appbar} elevation={0}>
      <Toolbar>
        <Link to="/" className="navbar-item" title="Logo">
          <Typography variant="h6" className={classes.title}>
            Spyre
          </Typography>
        </Link>
        {collapsed ? (
          <>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <Links />
            </Drawer>
            <div className={classes.spacer} />
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </>
        ) : (
          <Links />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

const Links = () => (
  <>
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
  </>
);
