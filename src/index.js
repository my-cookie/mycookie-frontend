import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import { AuthContextProvider } from "./auth/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers = {
  "Content-Type": "application/json"
};

root.render(
  <BrowserRouter>
    <RecoilRoot>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </RecoilRoot>
  </BrowserRouter>
);
