import { Typography } from "@material-ui/core";
import { TextField, makeStyles } from "@material-ui/core";
// import { useHistory } from "react-router";

export default function InputLogin(props) {
  const classes = useStyles();
  const {
    labelTitle,
    placeholder,
    name,
    value,
    errors,
    onChange,
    touched,
    required = false,
    onKeyPress = () => {},
  } = props;

  return (
    <div className={classes.root}>
      <div
        className={classes.label}
        style={{
          color: "#939393",
        }}
      >
        {labelTitle} {required && <span style={{ color: "red" }}>*</span>}
      </div>
      <TextField
        fullWidth
        variant="outlined"
        name={name}
        placeholder={placeholder}
        onKeyPress={onKeyPress}
        value={value}
        onChange={onChange}
        error={touched && errors}
        InputLabelProps={{
          shrink: true,
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            // notchedOutline: classes.notchedOutline,
          },
        }}
        {...props}
      />
      {errors && touched && (
        <Typography variant="body1" className={classes.error}>
          {errors}
        </Typography>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    // marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 10,
  },
  cssLabel: {
    color: "#BEC2CC",
  },
  cssOutlinedInput: {
    backgroundColor: "#FAFAFA",
    width: "100%",
    height: 40,
    paddingInline: 3,
    borderRadius: 8,
  },
  cssFocused: {
    color: "#333",
  },
  error: {
    marginTop: 5,
    color: "red",
    fontSize: 14,
  },
}));
