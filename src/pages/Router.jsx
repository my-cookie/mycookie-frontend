import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
