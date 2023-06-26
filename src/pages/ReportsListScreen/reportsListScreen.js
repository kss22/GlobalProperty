import React, { useEffect, useState } from "react";
import "../../App.css";
import { saveLanguage } from "../../localStorage";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import * as authentication from "../../utils/authentication";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ReportScreen = () => {
  const [data, setData] = useState([]);
  const [branchId, setBranchId] = useState("");
  const [fromDatePicker, setFromDatePicker] = useState(null);
  const [toDatePicker, setToDatePicker] = useState(null);
  const [available, setAvailable] = useState(false);

  const generateReport = () => {
    var backendHtmlString = "";

    var reportObject =
      '{"reportName":"BackendLoggingReport.jrxml","reportFormat":"html"';

    reportObject += ', "branchId":"' + branchId + '"';
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
        backendHtmlString = response.data.toString().split("</head>")[1];
        document.getElementById("reportBody").innerHTML = backendHtmlString;
        setAvailable(true);
      })
      .catch((error) => {
        console.log(error);
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
    return dayjs(date).format("YY-MMM-DD"); // Format the date as desired
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
      <Tooltip title="Go to ecom">
        <Button
          onClick={() => {
            window.location.href = "/listEcomLayout";
          }}
          variant="text"
        >
          Ecom
        </Button>
      </Tooltip>
      <Tooltip title="Go to global properties">
        <Button
          onClick={() => {
            window.location.href = "/listGlobalProperties";
          }}
          variant="text"
        >
          Global Properties
        </Button>
      </Tooltip>
      <Tooltip title="Go to acquirers">
        <Button
          onClick={() => {
            window.location.href = "/listAcquirers";
          }}
          variant="text"
        >
          Acquirers
        </Button>
      </Tooltip>
      <Tooltip title="Go to acquirer interfaces">
        <Button
          onClick={() => {
            window.location.href = "/listAcquirerInterface";
          }}
          variant="text"
        >
          Acquirer Interfaces
        </Button>
      </Tooltip>
      <Tooltip title="Go to interface bin">
        <Button
          onClick={() => {
            window.location.href = "/interfaceBin";
          }}
          variant="text"
        >
          Interface Bin
        </Button>
      </Tooltip>
      <Tooltip title="French">
        <Button
          onClick={() => {
            saveLanguage("fr");
            window.location.reload();
          }}
          variant="text"
        >
          Fr
        </Button>
      </Tooltip>
      <Tooltip title="English">
        <Button
          onClick={() => {
            saveLanguage("en");
            window.location.reload();
          }}
          variant="text"
        >
          En
        </Button>
      </Tooltip>
      <div>
        <div className="Header">
          <h2>Reports</h2>
          <br/>
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
          <div id="reportBody"></div>
        ) : (
          <Typography>No reports to display</Typography>
        )}
      </Paper>
    </div>
  );
};

export default ReportScreen;
