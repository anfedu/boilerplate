import React from "react";
import { ExpandMore } from "@material-ui/icons";
import { Typography, makeStyles } from "@material-ui/core";

import Select from "react-select";

const SelectForm = (props) => {
  const { maxHeight = 200, label, errors, touched, required = false } = props;
  const classes = useStyles();

  return (
    <div>
      <label style={{ marginBottom: 7 }}>
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>
      <Select
        {...props}
        maxMenuHeight={maxHeight}
        classNamePrefix="select"
        styles={{
          control: (base, state) => ({
            ...base,
            background: "#fff",
            color: "#222",
            height: 40,
            borderRadius: 8,
            border: `1px solid ${errors && touched ? "red" : "#B5B5B5"}`,
            paddingRight: 5,
          }),
        }}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: ExpandMore,
        }}
      />
      {errors && touched && (
        <Typography variant="body1" className={classes.error}>
          {errors}
        </Typography>
      )}
    </div>
  );
};

export default SelectForm;

const useStyles = makeStyles((theme) => ({
  error: {
    marginTop: 5,
    color: "red",
    fontFamily: "Work Sans",
    fontSize: 14,
  },
}));
