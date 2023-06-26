import { Button, Tooltip } from "@mui/material";
import { saveLanguage } from "../../localStorage";
import InterfaceBinHeader from "../../components/InterfaceBinConf/interfaceBinHeader";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { FaSave } from "react-icons/fa";
import NavTabs from "../../components/InterfaceBinConf/interfaceBinTabs";
import * as authentication from "../../utils/authentication";
import { toast } from "react-toastify";

const InterfaceBinScreen = () => {
  const [bin, setBin] = useState("");
  const [desc, setDesc] = useState("");
  const [cardName, setCardName] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [network, setNetwork] = useState("");
  const [chipOptionType, setChipOptionType] = useState("");
  const [cardAuthenticationMailbox, setCardAuthenticationMailbox] =
    useState("");
  const [pinVerificationParameterId, setPinVerificationParameterId] =
    useState("");
  const [useKeys, setUseKeys] = useState(false);
  const [instId, setInstId] = useState("");

  const [port, setPort] = useState("");
  const [binType, setBinType] = useState("");
  const [timeoutValue, setTimeoutValue] = useState("");
  const [actionOnTimeout, setActionOnTimeout] = useState("");
  const [echoTest, setEchoTest] = useState("");
  const [authorizationFlag, setAuthorizationFlag] = useState("");
  const [authorizationServer, setAuthorizationServer] = useState("");
  const [creditDebit, setCreditDebit] = useState("");
  const [reversalToIssuer, setReversalToIssuer] = useState(false);

  const [mailbox, setMailbox] = useState("");
  const [sendReversals, setSendReversals] = useState(false);
  const [duplicateTranCheckAsIssuer, setDuplicateTranCheckAsIssuer] =
    useState(false);

  const [resendInterval, setResendInterval] = useState("");
  const [slowInterval, setSlowInterval] = useState("");

  const [fastInterval, setFastInterval] = useState("");
  const [normalModePercentage, setNormalModePercentage] = useState("");
  const [maxOutMessages, setMaxOutMessages] = useState("");
  const [fullFileSize, setFullFileSize] = useState("");
  const [replaceResponses, setReplaceRespones] = useState(false);
  const [enableSystemMessages, setEnableSystemMessages] = useState(false);
  const [verifyResponse, setVerifyResponse] = useState(false);
  const [maxRetry, setMaxRetry] = useState("");

  const [typeOfStoreAndForward, setTypeOfStoreAndForward] = useState("");
  const [useSafFile, setUseSafFile] = useState(false);
  const [safAmount, setSafAmount] = useState("");
  const [safLimit, setSafLimit] = useState("");
  const [forwardModePercentage, setForwardModePercentage] = useState("");

  function handleSubmit() {
    const post = {
      routingGeneralRequestDto: {
        bankName: bankName,
        binCfg: chipOptionType,
        camMailbox: cardAuthenticationMailbox,
        cardName: cardName,
        countryCode: countryCode,
        currencyCode: currencyCode,
        description: desc,
        institutionId: instId,
        network: network,
        pinParm: pinVerificationParameterId,
        useKeys: useKeys ? "Y" : "N",
        userBinId: bin,
      },
      routingParametersRequestDto: {
        authFlag: authorizationFlag,
        authServer: authorizationServer,
        binType: binType,
        debitCredit: creditDebit,
        echoTest: echoTest,
        mailbox: mailbox,
        port: port,
        safInter: "string",
        timeout: timeoutValue,
      },
      routingSAFRequestDto: {
        enableProcReq: enableSystemMessages ? "Y" : "N",
        finterval: fastInterval,
        fpercent: forwardModePercentage,
        fullFileSize: fullFileSize,
        maxRetry: maxRetry,
        maxout: maxOutMessages,
        npercent: normalModePercentage,
        replaceResponses: replaceResponses ? "Y" : "N",
        rinterval: resendInterval,
        safAmount: safAmount,
        safFile: useSafFile ? "Y" : "N",
        safLimit: safLimit,
        safType: "string",
        sinterval: slowInterval,
        verifyResponse: verifyResponse ? "Y" : "N",
      },
    };

    fetch(`${authentication.SERVER_URL}/v1/routing/config`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authentication.token}`,
        branchId: "1",
        instId: "1",
      },
      body: JSON.stringify(post),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Interface BIN configured successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }
        return response.json();
      })
      .then((data) => {
        if (data.errors !== null) {
          const lengthOfErrors = data.errors.length;
          for (let i = 0; i < lengthOfErrors; i++) {
            toast.error(data.errors[i], {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              progress: undefined,
            });
          }
        }
      })
      .catch((err) => {
        toast.error(err, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      });
  }

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
      <Tooltip title="Go to Acquirers">
        <Button
          onClick={() => {
            window.location.href = "/listAcquirers";
          }}
          variant="text"
        >
          Acquirer
        </Button>
      </Tooltip>
      <Tooltip title="Go to acquirer interfaces">
        <Button
          onClick={() => {
            window.location.href = "/listAcquirers";
          }}
          variant="text"
        >
          Acquirers
        </Button>
      </Tooltip>
      <Tooltip title="Go to reports">
        <Button
          onClick={() => {
            window.location.href = "/reports";
          }}
          variant="text"
        >
          Reports
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
          <h2>Interface Bin Configuration</h2>
          <br />
        </div>
        <div className="header-wrapper">
          <InterfaceBinHeader
            bin={bin}
            desc={desc}
            setBin={setBin}
            setDesc={setDesc}
            setInstIdParent={setInstId}
          />
        </div>
      </div>
      <br />
      <div className="Tabs">
        <NavTabs
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
      </div>
      <div className="Submissions">
        <Tooltip title="Cancel Creation">
          <Button variant="text" onClick={() => (window.location.href = "/")}>
            <FormattedMessage id="cancel-button" defaultMessage="cancel" />
          </Button>
        </Tooltip>
        <Tooltip title="Create Interface Bin Configuration">
          <Button
            variant="contained"
            endIcon={<FaSave className="save" />}
            onClick={() => handleSubmit()}
          >
            {" "}
            <FormattedMessage id="submit-button" defaultMessage="Submit" />{" "}
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default InterfaceBinScreen;
