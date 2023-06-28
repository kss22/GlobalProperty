import React, { useEffect, useState } from "react";
import "../../App.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import * as authentication from "../../utils/authentication";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NavBar from "../../components/navBar";

const ReportScreen = () => {
  const [data, setData] = useState([]);
  const [branchId, setBranchId] = useState("");
  const [fromDatePicker, setFromDatePicker] = useState(null);
  const [toDatePicker, setToDatePicker] = useState(null);
  const [available, setAvailable] = useState(false);

  const [backendHtmlString, setBackendHtmlString] = useState("");


  const generateReport = () => {
    var reportObject =
      '{"reportName":"BackendLoggingReport.jrxml","reportFormat":"html"';

    reportObject += ', "branchId":"' + parseInt(branchId) + '"';
    reportObject +=
      ', "fromDate": "' +
      formatDate(fromDatePicker) +
      '", "toDate":"' +
      formatDate(toDatePicker) +
      '"';
    reportObject += "}";

    console.log(reportObject);

    fetch(`${authentication.SERVER_URL}/v1/report/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authentication.token}`,
        branchId: "1",
        instId: "1",
      },
      body: decodeURI(reportObject),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Report generation failed.");
        }
        return response.text();
      })
      .then((data) => {
        const backendHtmlString = data.toString().split("</head>")[1];
        setAvailable(true);
        setBackendHtmlString(backendHtmlString);
        
      })
      .catch((error) => {
        console.log(error);
        setAvailable(false);
        setBackendHtmlString("");
      });
    return { __html: backendHtmlString };
  };

  function formatFromDate(date) {
    setFromDatePicker(date);
  }

  function formatToDate(date) {
    setToDatePicker(date);
  }

  const formatDate = (date) => {
    return dayjs(date).format("YY-MMM-DD"); 
  };

  useEffect(() => {
    fetch(`${authentication.SERVER_URL}/v1/config/branches/active`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authentication.token}`,
        branchId: "1",
        instId: "1",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="MainContainer">
      <NavBar/>
      <div>
        <div className="Header">
          <h2>Reports</h2>
          <br />
        </div>
        <div className="report-filters">
          <label className="required">
            <FormattedMessage id="branch-column" defaultMessage="Branch:" />
          </label>
          <FormControl sx={{ minWidth: 220 }} size="medium">
            <InputLabel id="select-branch">
              <FormattedMessage
                id="branch-name-option"
                defaultMessage="Choose Branch Name"
              />
            </InputLabel>

            <Select
              labelId="select-branch-name"
              value={branchId}
              label="Branch Name"
              onChange={(e) => {
                setBranchId(e.target.value);
              }}
            >
              {data.map((item) => (
                <MenuItem value={item.branchId}>{item.branchName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <label>From Date:</label>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={fromDatePicker}
              onChange={(e) => formatFromDate(e)}
              renderInput={(params) => <TextField {...params} />}
              disableFuture
              className="small-datepicker"
              sx={{ width: 220 }}
            />
          </LocalizationProvider>

          <label>To Date:</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={toDatePicker}
              onChange={(e) => formatToDate(e)}
              renderInput={(params) => <TextField {...params} />}
              disableFuture
              className="small-datepicker"
              sx={{ width: 220 }}
            />
          </LocalizationProvider>
          <Button variant="contained" onClick={generateReport}>
            Generate Report
          </Button>
        </div>
      </div>
      <Paper
        sx={{
          minHeight: 600,
          bgcolor: "#e6e6e6e6",
          overflow: "auto",
          width: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 200,
        }}
      >
        {available ? (
          <div dangerouslySetInnerHTML={{ __html: backendHtmlString }} />
        ) : (
          <Typography>No reports to display</Typography>
        )}
      </Paper>
    </div>
  );
};

export default ReportScreen;
