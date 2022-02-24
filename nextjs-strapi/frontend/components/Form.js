import React from "react";
import { makeStyles, Grid, Box, IconButton, Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDropzone } from "react-dropzone";
import { useQuery } from "react-query";

const MySwal = withReactContent(Swal);

import Input from "./Input";
import { postEvents, putEvents, upload, getFile } from "../api/events";
// import Modal from "./Modal";

const schema = Yup.object().shape({
  event_name: Yup.string().nullable().required("Wajib diisi"),
  date: Yup.string().nullable().required("Wajib diisi"),
  time: Yup.string().nullable().required("Wajib diisi"),
  location: Yup.string().nullable().required("Wajib diisi"),
});

export default function Form(props) {
  const classes = useStyles();
  const {
    initialValues = {},
    state,
    setState,
    rowId,
    setRowId,
    imageId,
    setImageId,
  } = props;
  const [files, setFiles] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const onUpload = async (file, reader) => {
    try {
      const formData = new FormData();
      formData.append(`files`, file, file.name);
      const result = await upload(formData);
      reader.onloadend = () => {
        setFiles(reader.result);
      };
      reader.readAsDataURL(file);
      setImageId(result.data[0].id);
    } catch (error) {
      console.log(error);
    }
  };

  const onDrop = React.useCallback((acceptedFiles) => {
    // Do something with the files
    let file = acceptedFiles[0];
    let reader = new FileReader();

    onUpload(file, reader);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const { isLoading, isFetching } = useQuery(
    // query key
    ["image", { id: imageId }],
    () => getFile(imageId),
    {
      keepPreviousData: true,
      select: (response) => response.data,
      onSuccess: (result) => {
        let server = "http://localhost:1337";
        let res = result.formats.thumbnail.url;

        setFiles(server + res);
      },
    }
  );

  const onSubmit = async (values) => {
    let newValues = {
      event_name: values.event_name,
      date: values.date,
      time: values?.time.length === 5 ? `${values?.time}:00` : values?.time,
      location: values.location,
      image: imageId,
      imageId,
    };
    try {
      const result = rowId
        ? await putEvents(newValues, rowId)
        : await postEvents(newValues);
      MySwal.fire("Success!", "Your file has been add data.", "success").then(
        () => {
          setState("");
          setRowId(null);
          setFiles(null);
        }
      );
    } catch (error) {
      MySwal.fire("Failed!", "Internal server error", "error");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={schema}
      enableReinitialize
    >
      {(formik) => {
        const {
          handleChange,
          values,
          setFieldValue,
          isSubmitting,
          handleSubmit,
          errors,
          touched,
        } = formik;

        return (
          <form onSubmit={handleSubmit} action="">
            <Grid container spacing={3} className={classes.root}>
              <Grid item md={12}>
                <Input
                  labelTitle="Event Name"
                  name="event_name"
                  value={values?.event_name}
                  onChange={handleChange}
                  errors={errors?.event_name}
                  touched={touched?.event_name}
                />
              </Grid>
              <Grid item md={6}>
                <Input
                  labelTitle="Date"
                  type="date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  errors={errors?.date}
                  touched={touched?.date}
                />
              </Grid>
              <Grid item md={6}>
                <Input
                  labelTitle="Time"
                  type="time"
                  name="time"
                  value={values.time}
                  onChange={handleChange}
                  errors={errors?.time}
                  touched={touched?.time}
                />
              </Grid>
              <Grid item md={12}>
                <Input
                  labelTitle="Location"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  errors={errors?.location}
                  touched={touched?.location}
                />
              </Grid>
              <Grid item md={12}>
                <div
                  style={{ fontSize: 18, color: "#939393", marginBottom: 9 }}
                >
                  Upload Image
                </div>
                {files ? (
                  <Box style={{ position: "relative", width: 250 }}>
                    <IconButton
                      color="secondary"
                      variant="contained"
                      className={classes.close}
                      onClick={() => {
                        setFieldValue("image", null);
                        setFiles(null);
                      }}
                    >
                      <Close style={{ color: "white" }} />
                    </IconButton>
                    <img
                      src={files}
                      alt=""
                      style={{ width: 250, borderRadius: 15 }}
                    />
                  </Box>
                ) : (
                  <div {...getRootProps()} className={classes.buttonImage}>
                    <div>Drop files here or click to upload.</div>
                    <input {...getInputProps()} type="file" name="image" />
                  </div>
                )}
              </Grid>
              <Grid md={12} justify="start" style={{ paddingTop: 30 }}>
                {state !== "view" && (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ textTransform: "none", width: 179, height: 47 }}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? "Loading..." : "Save"}
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  style={{
                    textTransform: "none",
                    width: 179,
                    marginLeft: 15,
                    height: 47,
                  }}
                  onClick={() => {
                    setState("");
                    setRowId(null);
                    setFiles(null);
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: "#fff",
    borderRadius: 20,
    padding: 30,
    marginLeft: 1,
  },
  buttonImage: {
    height: 206,
    width: "100%",
    borderRadius: 10,
    border: "2px dashed #C5C5C5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
    color: "#939393",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.7,
    },
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
    background: "red",
    opacity: 0.3,
    textTranform: "none",
  },
}));
