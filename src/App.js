import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalPropertiesScreen from "./pages/GlobalProperties/globalPropertiesScreen";
import GlobalPropertyScreen from "./pages/GlobalProperties/globalPropertyScreen";
import { IntlProvider } from "react-intl";
import enLabels from './utils/labels/en.json';
import frLabels from './utils/labels/fr.json';
import { getLanguage } from "./localStorage";
import Authorization from "./utils/authorization";
import AddEcomLayout from "./pages/ecomAddLayout";
import ListEcomLayout from "./pages/ecomListLayout";
import AcquirerScreen from "./pages/acquirerScreen";

function App() {

  const locale = getLanguage();

  let labels;
  if (locale === 'en') {
    labels = enLabels;
  } else {
    labels = frLabels;
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authorization/>}/>
          <Route path="/listGlobalProperties" element={<IntlProvider locale={locale} messages={labels}><GlobalPropertiesScreen /></IntlProvider>} />
          <Route
            path="/addGlobalProperty/:propId?"
            element={<IntlProvider locale={locale} messages={labels}><GlobalPropertyScreen /></IntlProvider>}
          />
          <Route path="/listEcomLayout" element={<IntlProvider locale={locale} messages={labels}><ListEcomLayout/></IntlProvider>}/>
          <Route path="/addEcomLayout/:ecomLayoutId?" element={<IntlProvider locale={locale} messages={labels}><AddEcomLayout/></IntlProvider>}/>
          <Route path="/listAcquirers" element={<IntlProvider locale={locale} messages={labels}><AcquirerScreen/></IntlProvider>}/>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
