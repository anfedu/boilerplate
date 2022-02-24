import * as React from "react";
import {
  Dialog,
  DialogContent,
  makeStyles,
  Box,
  IconButton,
  Grid,
} from "@material-ui/core";
import { useQuery, useQueryClient } from "react-query";

export default function AlertDialog({ open, setOpen }) {
  const classes = useStyles();
  const queryClient = useQueryClient();

  const handleCloseModal = () => {
    queryClient.invalidateQueries("delegation");
    queryClient.invalidateQueries("courier");
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.paper }}
      >
        <DialogContent>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 25,
            }}
          >
            <IconButton
              onClick={handleClose}
              className={classes.close}
            ></IconButton>
          </Box>
          <Box style={{ width: 210 }}></Box>
          <Grid container style={{ marginBottom: -10 }}>
            <Grid xs={12} sm={3}></Grid>
            <Grid xs={12} sm={5} className={classes.inputSearch}></Grid>
          </Grid>
          <Box className={classes.container4}></Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: 25,
              paddingBottom: 15,
            }}
          ></Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 684,
    borderRadius: 24,
    overflowX: "hidden",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    maxHeight: "100vh",
  },
  close: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "#222",
  },
  container: {
    marginTop: 25,
    paddingBottom: 25,
    paddingRight: 25,
  },
  inputSearch: {
    [theme.breakpoints.down("xs")]: {
      paddingTop: 15,
    },
  },
  container4: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 25,
  },
}));
