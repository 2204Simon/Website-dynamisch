import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import combinedStore from "./redux/RootStore";
import { CookiesProvider } from "react-cookie";
import { ThemeProvider } from "./Theme";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={combinedStore}>
      <ThemeProvider>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
