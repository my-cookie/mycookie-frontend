import Router from "./pages/Router";
import { Reset } from "styled-reset";
import GlobalFonts from "../src/styles/font";

function App() {
  return (
    <>
      <Reset />
      <GlobalFonts />
      <Router />
    </>
  );
}

export default App;
