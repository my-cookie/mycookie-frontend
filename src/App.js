import Router from "./pages/Router";
import { Reset } from "styled-reset";
import GlobalFonts from "../src/styles/font";
import RouteChangeTracker from "./components/RouteChangeTracker";

function App() {
  RouteChangeTracker();

  return (
    <>
      <Reset />
      <GlobalFonts />
      <Router />
    </>
  );
}

export default App;
