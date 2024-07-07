import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button, Hidden } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import memories from "../../images/memories.png";
import memoriesText from "../../images/memoriesText.png";
import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    Navigate("/");
    setUser(null);
    window.location.reload();
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <Hidden smDown>
          <img src={memoriesText} alt="icon" height="45px" />
        </Hidden>
        <img className={classes.image} src={memories} alt="icon" height="50px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.decodedCredential?.name || user?.result?.name}
              src={user?.decodedCredential?.picture}
            >
              {user?.decodedCredential?.name.charAt(0) || user?.result?.name.charAt(0)}
            </Avatar>
            {/* <Typography className={classes.userName} variant="h6">
              {user?.decodedCredential?.name || user?.result?.name}
            </Typography> */}
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
