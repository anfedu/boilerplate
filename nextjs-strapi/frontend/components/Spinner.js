import React from "react";
import { makeStyles, CircularProgress } from "@material-ui/core";
import { useTransition, animated } from "react-spring";
// import { colors } from "styles/theme";

export default function Spinner(props) {
  const classes = useStyles();
  const { isLoading, isFetching, empty = false } = props;

  const fetchTransition = useTransition(
    isFetching && !isLoading && !empty ? true : false,
    null,
    {
      from: { opacity: 0 },
      enter: { opacity: 0.9 },
      leave: { opacity: 0 },
    }
  );

  const validate = (isLoading && empty) || (isFetching && empty);

  return (
    <>
      {fetchTransition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className={classes.loadingContainer}
            >
              <CircularProgress
                disableShrink
                thickness={5}
                style={{ color: "blue" }}
              />
            </animated.div>
          )
      )}

      {validate && (
        <div className={classes.loadingContainer} style={{ opacity: 0.7 }}>
          <CircularProgress
            disableShrink
            thickness={5}
            style={{ color: "blue" }}
          />
        </div>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "white",
    cursor: "not-allowed",
  },
}));
