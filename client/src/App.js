import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { makeStyles } from "@material-ui/core/styles";
import background from "./assets/background.jpg";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { Chart } from "react-google-charts";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    backgroundSize: "cover",
    backgroundImage: `url(${background})`,
    height: "100%",
  },
  upperPanelContainer: {
    textAlign: "center",
  },
  header: {
    margin: "0 0 10px 0",
    color: "white",
  },
  tableHeader: {
    backgroundColor: "grey",
    marginTop: "15px",
    marginLeft: "15px",
    marginRight: "15px",
  },
  tableContainer: {
    marginTop: "15px",
    marginRight: "15px",
  },
});

export default function App() {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [visilizationData, setVisilizationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function dataHandler(data) {
    return data.map((item) => {
      return [
        new Date(item.collect_time),
        item.temperature,
        item.humidity,
        item.moisture,
        item.light,
      ];
    });
  }

  function fetchDataHandler() {
    // setError(null);
    fetch("http://127.0.0.1:5000/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        console.log(dataHandler(data));
        setVisilizationData(dataHandler(data));
        setIsLoading(false);
      });
  }

  useEffect(fetchDataHandler, []);

  return (
    <div className={classes.container}>
      <div className={classes.upperPanelContainer}>
        <h1 className={classes.header}>Planter Helper Dashboard</h1>
        <Button variant="outline-primary" size="lg" onClick={fetchDataHandler}>
          Refresh
        </Button>
      </div>

      {/* table */}
      <div className={classes.tableHeader}>
        {data && (
          <TableContainer component={Paper} className={classes.tableContainer}>
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
                      {new Date(row.collect_time).toLocaleString()}
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

        {visilizationData && (
          <Chart
            width={"100%"}
            height={300}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Date/time", "Temperature", "Humidity", "Moisture", "Light"],
              ...visilizationData,
            ]}
            options={{
              title: "Value change over time",
              hAxis: { title: "Time" },
              vAxis: { title: "Value" },
              bubble: { textStyle: { fontSize: 11 } },
            }}
          />
        )}
      </div>
    </div>
  );
}

// /Users/apple/mongodb/bin/mongod --dbpath=/Users/apple/mongodb-data
