import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalPropertiesScreen from "./pages/GlobalProperties/globalPropertiesScreen";

import { IntlProvider } from "react-intl";
import enLabels from "./utils/labels/en.json";
import frLabels from "./utils/labels/fr.json";
import { getLanguage } from "./localStorage";
import Authorization from "./utils/authorization";
import AddEcomLayout from "./pages/EcomScreen/ecomAddLayout";
import ListEcomLayout from "./pages/EcomScreen/ecomListLayout";
import AcquirerScreen from "./pages/AcquirersScreen/acquirerScreen";
import AcquirerInterfaceScreen from "./pages/AcquirerInterface/acquirerInterfaceScreen";
import ReportScreen from "./pages/ReportsListScreen/reportsListScreen";
import InterfaceBinScreen from "./pages/InterfaceBinScreen/interfaceBinScreen";


function App() {
  const locale = getLanguage();

  let labels;
  if (locale === "en") {
    labels = enLabels;
  } else {
    labels = frLabels;
  }

  return (
    <BrowserRouter>
      <Routes>
        
          <Route path="/" element={<Authorization />} />
          <Route
            path="/listGlobalProperties"
            element={
              <IntlProvider locale={locale} messages={labels}>
                
                <GlobalPropertiesScreen />
                
              </IntlProvider>
            }
          />
          <Route
            path="/listEcomLayout"
            element={
              <IntlProvider locale={locale} messages={labels}>
                <ListEcomLayout />
              </IntlProvider>
            }
          />
          <Route
            path="/addEcomLayout/:ecomLayoutId?"
            element={
              <IntlProvider locale={locale} messages={labels}>
                <AddEcomLayout />
              </IntlProvider>
            }
          />
          <Route
            path="/listAcquirers"
            element={
              <IntlProvider locale={locale} messages={labels}>
                <AcquirerScreen />
              </IntlProvider>
            }
          />
          <Route
            path="/listAcquirerInterface"
            element={
              <IntlProvider locale={locale} messages={labels}>
                <AcquirerInterfaceScreen />
              </IntlProvider>
            }
          />
          <Route
            path="/reports"
            element={
              <IntlProvider locale={locale} messages={labels}>
                <ReportScreen />
              </IntlProvider>
            }
          />
          <Route
            path="/interfaceBin"
            element={
              <IntlProvider locale={locale} messages={labels}>
                <InterfaceBinScreen />
              </IntlProvider>
            }
          />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
