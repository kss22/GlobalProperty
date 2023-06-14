import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalPropertiesScreen from "./pages/globalPropertiesScreen";
import GlobalPropertyScreen from "./pages/globalPropertyScreen";
import { IntlProvider } from "react-intl";
import enLabels from './utils/labels/en.json';
import frLabels from './utils/labels/fr.json';
import { getLanguage } from "./localStorage";

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
          <Route path="/" element={<IntlProvider locale={locale} messages={labels}><GlobalPropertiesScreen /></IntlProvider>} />
          <Route
            path="/addGlobalProperty/:propId?"
            element={<IntlProvider locale={locale} messages={labels}><GlobalPropertyScreen /></IntlProvider>}
          />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
