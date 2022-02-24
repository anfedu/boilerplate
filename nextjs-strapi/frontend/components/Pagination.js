import React from "react";
import { usePagination } from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import Select from "./Select";

const useStyles = makeStyles({
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
  },
});

export default function UsePagination({
  page,
  setPage,
  pageSize,
  setPageSize,
  total,
  count,
}) {
  const classes = useStyles();
  const { items } = usePagination({
    count,
  });

  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, total - 1);

  return (
    <nav
      style={{
        // background: "pink",
        display: "flex",
        justifyContent: "space-between",
        marginTop: 15,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Select
          label=""
          value={{ value: pageSize, label: pageSize }}
          options={[
            { value: 5, label: 5 },
            { value: 10, label: 10 },
            { value: 20, label: 20 },
          ]}
          onChange={(value) => {
            setPage(1);
            setPageSize(value.value);
            // setFilter({ ...filter, page: 1, pageSize: value.value });
          }}
        />
        <p style={{ marginLeft: 15 }}>
          Showing {total === 0 ? 0 : startIndex + 1} to {endIndex + 1} of{" "}
          {total}
        </p>
      </div>
      <ul className={classes.ul}>
        {items.map(({ page: pageRow, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <button
                type="button"
                style={{
                  fontWeight: pageRow === page ? "bold" : undefined,
                  width: 40,
                  height: 40,
                  border: "1px solid #eee",
                  background: "#fff",
                }}
                {...item}
                onClick={() => setPage(pageRow)}
              >
                {pageRow}
              </button>
            );
          } else {
            children = (
              <button
                type="button"
                {...item}
                style={{
                  height: 40,
                  paddingInline: 15,
                  border: "1px solid #eee",
                  background: "#fff",
                  borderRadius: 7,
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (type === "next") {
                    setPage(page + 1);
                  } else setPage(page - 1);
                }}
                disabled={
                  type === "next"
                    ? page === count
                    : type === "previous" && page === 1
                }
              >
                {type}
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </ul>
    </nav>
  );
}
