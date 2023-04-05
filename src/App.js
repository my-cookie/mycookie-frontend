import Router from "./pages/Router";
import { Reset } from "styled-reset";

import Layout from "./pages/Layout";

function App() {
  return (
    <>
      <Reset />
      <Layout>
        <Router />
      </Layout>
    </>
  );
}

export default App;
