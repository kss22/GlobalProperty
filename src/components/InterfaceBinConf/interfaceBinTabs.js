import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PageOne from "./interfaceBinPageOne";
import PageTwo from "./interfaceBinPageTwo";
import PageThree from "./interfaceBinPageThree";

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function NavTabs({
  cardName,
  setCardName,
  currencyCode,
  setCurrencyCode,
  countryCode,
  setCountryCode,
  bankName,
  setBankName,
  network,
  setNetwork,
  chipOptionType,
  setChipOptionType,
  cardAuthenticationMailbox,
  setCardAuthenticationMailbox,
  pinVerificationParameterId,
  setPinVerificationParameterId,
  useKeys,
  setUseKeys,
  mailbox,
  setMailbox,
  port,
  setPort,
  binType,
  setBinType,
  timeoutValue,
  setTimeoutValue,
  actionOnTimeout,
  setActionOnTimeout,
  echoTest,
  setEchoTest,
  authorizationFlag,
  setAuthorizationFlag,
  authorizationServer,
  setAuthorizationServer,
  creditDebit,
  setCreditDebit,
  reversalToIssuer,
  setReversalToIssuer,
  sendReversals,
  setSendReversals,
  duplicateTranCheckAsIssuer,
  setDuplicateTranCheckAsIssuer,
  resendInterval,
  setResendInterval,
  slowInterval,
  setSlowInterval,
  fastInterval,
  setFastInterval,
  normalModePercentage,
  setNormalModePercentage,
  maxOutMessages,
  setMaxOutMessages,
  fullFileSize,
  setFullFileSize,
  replaceResponses,
  setReplaceRespones,
  enableSystemMessages,
  setEnableSystemMessages,
  verifyResponse,
  setVerifyResponse,
  maxRetry,
  setMaxRetry,
  typeOfStoreAndForward,
  setTypeOfStoreAndForward,
  useSafFile,
  setUseSafFile,
  safAmount,
  setSafAmount,
  safLimit,
  setSafLimit,
  forwardModePercentage,
  setForwardModePercentage
}) {
  const [value, setValue] = useState(0);
  const [selectedHref, setSelectedHref] = useState("/gen");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedHref(event.target.getAttribute("href"));
  };

  const renderPage = () => {
    switch (selectedHref) {
      case "/gen":
        return (
          <PageOne
            cardName={cardName}
            setCardName={setCardName}
            currencyCode={currencyCode}
            setCurrencyCode={setCurrencyCode}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            bankName={bankName}
            setBankName={setBankName}
            network={network}
            setNetwork={setNetwork}
            chipOptionType={chipOptionType}
            setChipOptionType={setChipOptionType}
            cardAuthenticationMailbox={cardAuthenticationMailbox}
            setCardAuthenticationMailbox={setCardAuthenticationMailbox}
            pinVerificationParameterId={pinVerificationParameterId}
            setPinVerificationParameterId={setPinVerificationParameterId}
            useKeys={useKeys}
            setUseKeys={setUseKeys}
          />
        );
      case "/params":
        return (
          <PageTwo
            mailbox={mailbox}
            setMailbox={setMailbox}
            port={port}
            setPort={setPort}
            binType={binType}
            setBinType={setBinType}
            timeoutValue={timeoutValue}
            setTimeoutValue={setTimeoutValue}
            actionOnTimeout={actionOnTimeout}
            setActionOnTimeout={setActionOnTimeout}
            echoTest={echoTest}
            setEchoTest={setEchoTest}
            authorizationFlag={authorizationFlag}
            setAuthorizationFlag={setAuthorizationFlag}
            authorizationServer={authorizationServer}
            setAuthorizationServer={setAuthorizationServer}
            creditDebit={creditDebit}
            setCreditDebit={setCreditDebit}
            reversalToIssuer={reversalToIssuer}
            setReversalToIssuer={setReversalToIssuer}
            sendReversals={sendReversals}
            setSendReversals={setSendReversals}
            duplicateTranCheckAsIssuer={duplicateTranCheckAsIssuer}
            setDuplicateTranCheckAsIssuer={setDuplicateTranCheckAsIssuer}
          />
        );
      case "/saf":
        return (
          <PageThree
            resendInterval={resendInterval}
            setResendInterval={setResendInterval}
            slowInterval={slowInterval}
            setSlowInterval={setSlowInterval}
            fastInterval={fastInterval}
            setFastInterval={setFastInterval}
            normalModePercentage={normalModePercentage}
            setNormalModePercentage={setNormalModePercentage}
            maxOutMessages={maxOutMessages}
            setMaxOutMessages={setMaxOutMessages}
            fullFileSize={fullFileSize}
            setFullFileSize={setFullFileSize}
            replaceResponses={replaceResponses}
            setReplaceRespones={setReplaceRespones}
            enableSystemMessages={enableSystemMessages}
            setEnableSystemMessages={setEnableSystemMessages}
            verifyResponse={verifyResponse}
            setVerifyResponse={setVerifyResponse}
            maxRetry={maxRetry}
            setMaxRetry={setMaxRetry}
            typeOfStoreAndForward={typeOfStoreAndForward}
            setTypeOfStoreAndForward={setTypeOfStoreAndForward}
            useSafFile={useSafFile}
            setUseSafFile={setUseSafFile}
            safAmount={safAmount}
            setSafAmount={setSafAmount}
            safLimit={safLimit}
            setSafLimit={setSafLimit}
            forwardModePercentage={forwardModePercentage}
            setForwardModePercentage={setForwardModePercentage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav-tabs">
        <LinkTab label="General" href="/gen" />
        <LinkTab label="Parameters" href="/params" />
        <LinkTab label="SAF" href="/saf" />
      </Tabs>
      <div className="page-container">{renderPage()}</div>
    </Box>
  );
}
