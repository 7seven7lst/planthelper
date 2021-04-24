import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import background from "./assets/background.jpg";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function App() {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function fetchDataHandler() {
    // setError(null);
    fetch("http://127.0.0.1:5000/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }

  useEffect(fetchDataHandler, []);

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        bottom: 0,
        height: "100%",
        margin: 0,
        // backgroundColor: "red",
      }}
    >
      <div style={{}}>
        <h1 style={{}}>Table</h1>
        <Button variant="primary" size="lg" onClick={fetchDataHandler}>
          Get Data
        </Button>
      </div>

      {/* table */}
      <div
        style={{
          backgroundColor: "grey",
          marginTop: "15px",
          marginLeft: "15px",
          marginRight: "15px",
        }}
      >
        {data && (
          <TableContainer
            component={Paper}
            style={{
              marginTop: "15px",
              marginRight: "15px",
            }}
          >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date/time </TableCell>
                  <TableCell align="right">Temperature</TableCell>
                  <TableCell align="right">Humidity</TableCell>
                  <TableCell align="right">Moisture</TableCell>
                  <TableCell align="right">Light</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row.collect_time}
                    </TableCell>
                    <TableCell align="right">{row.temperature}</TableCell>
                    <TableCell align="right">{row.humidity}</TableCell>
                    <TableCell align="right">{row.moisture}</TableCell>
                    <TableCell align="right">{row.light}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}

// /Users/apple/mongodb/bin/mongod --dbpath=/Users/apple/mongodb-data
