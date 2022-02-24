import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Add } from "@material-ui/icons";
// import { useRouter } from "next/router";
import { useQuery } from "react-query";

import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Form from "../components/Form";
import { getEvent } from "../api/events";

export default function Index() {
  const [state, setState] = React.useState("");
  const [rowId, setRowId] = React.useState(null);
  // const router = useRouter();
  const [initialValues, setInitialValues] = React.useState(staticValues);
  const [imageId, setImageId] = React.useState(null);

  const { isLoading, isFetching } = useQuery(
    // query key
    ["events", { id: rowId }],
    () => getEvent(rowId),
    {
      keepPreviousData: true,
      select: (response) => response.data.data,
      onSuccess: (result) => {
        let res = result.attributes;
        setInitialValues(res);
        setImageId(res.imageId);
      },
    }
  );

  return (
    <Layout>
      <Box py={12}>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Event Management
          </Typography>
          {state === "" ? (
            <Button
              variant="contained"
              color="primary"
              style={{ height: 38, width: 48 }}
              onClick={() => {
                setState("Add");
                setInitialValues(staticValues);
                setImageId(null);
              }}
            >
              <Add />
            </Button>
          ) : (
            <Box style={{ display: "flex", justifyContent: "end" }}>
              <Button
                style={{ textTransform: "none" }}
                onClick={() => setState("")}
              >
                Event Management
              </Button>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  position: "relative",
                  top: 5,
                }}
              >
                >
              </span>
              <Button style={{ textTransform: "none" }}>{state} Event</Button>
            </Box>
          )}
        </Box>
        <Box mt={3}>
          {state === "" ? (
            <Table
              state={state}
              setState={setState}
              rowId={rowId}
              setRowId={setRowId}
            />
          ) : (
            <Form
              initialValues={initialValues}
              state={state}
              setState={setState}
              rowId={rowId}
              setRowId={setRowId}
              imageId={imageId}
              setImageId={setImageId}
            />
          )}
        </Box>
      </Box>
    </Layout>
  );
}
let staticValues = {
  event_name: "",
  date: "",
  time: "",
  location: "",
};
