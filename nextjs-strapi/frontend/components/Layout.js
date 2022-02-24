import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";

import User from "./User";

const drawerWidth = 240;

export default function ClippedDrawer({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        color="inherit"
        relative
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <img src="/newlogo.svg" alg="" />

          <User />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {["Event Management"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <img src="/calendar.svg" alt="" />
                </ListItemIcon>
                <ListItemText
                  style={{ color: "#506EE4", fontWeight: 500, fontSize: 18 }}
                  primary={text}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        {/*<Toolbar />*/}
        {children}
      </main>
    </div>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      boxShadow: "0px 5px 25px 10px rgba(196, 204, 210, 0.25)",
      height: 100,
      justifyContent: "center",
      paddingInline: 70,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      boxShadow: "0px 5px 15px rgba(178, 203, 226, 0.3)",
      border: "none",
      paddingTop: 50,
    },
    drawerContainer: {
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      background: "#f5f5f5",
      minHeight: "100vh",
    },
  })
);
