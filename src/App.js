import Router from "./pages/Router";
import { Reset } from "styled-reset";
import GlobalFonts from "../src/styles/font";
import ReactGA from "react-ga";

function App() {
  const gaTrackingId = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID; // 환경 변수에 저장된 추적ID 가져오기
  ReactGA.initialize(gaTrackingId, { debug: true }); // react-ga 초기화 및 debug 사용
  ReactGA.pageview(window.location.pathname); // 추적하려는 page 설정
  return (
    <>
      <Reset />
      <GlobalFonts />
      <Router />
    </>
  );
}

export default App;
