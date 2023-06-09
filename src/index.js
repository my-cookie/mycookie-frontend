import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
import ReactGA from "react-ga";
import LoadingLogin from "./pages/loading/LoadingLogin";

const root = ReactDOM.createRoot(document.getElementById("root"));
const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;

ReactGA.initialize(TRACKING_ID);

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers = {
  "Content-Type": "application/json"
};

root.render(
  <RecoilRoot>
    <Suspense fallback={<LoadingLogin />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </RecoilRoot>
);
