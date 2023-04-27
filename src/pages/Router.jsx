import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import FriendSelectCookie from "../pages/message/FriendSelectCookie";
import KakaoLogin from "./KakaoLogin";
import Login from "./Login";
import Mymessage from "./message/Mymessage";
import SenderReadMessage from "./message/SenderReadMessage";
import ReceiverReadMessage from "./message/ReceiverReadMessage";
import SendMessage from "./message/SendMessage";
import SearchCookie from "../pages/message/SearchCookie";
import MyPage from "./user/MyPage";
import Nickname from "./user/Nickname";
import SelectCookie from "./user/SelectCookie";
import Layout from "../pages/layout/Layout";
import PrivateLayout from "../pages/layout/PrivateLayout";
import LoadingMsg from "./loading/LoadingMsg";
import CompletedMsg from "./message/CompletedMsg";
import Feedback from "./Feedback";
import ChangeSelectCookie from "./message/ChangeSelectCookie";
import ReactGA from "react-ga";
import MyCookie from "./user/MyCookie";

function Router() {
  const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;

  ReactGA.initialize(TRACKING_ID);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/oauth/callback/kakao" element={<KakaoLogin />} />
        <Route path="/nickname" element={<Nickname />} />
        <Route path="/select" element={<SelectCookie />} />
      </Route>

      <Route element={<PrivateLayout />}>
        <Route path="/mymessage" element={<Mymessage />} />
        <Route path="/readmessage" element={<SenderReadMessage />} />
        <Route
          path="/receiver_read_message"
          element={<ReceiverReadMessage />}
        />
        <Route path="/sendmessage" element={<SendMessage />} />
        <Route path="/searchcookie" element={<SearchCookie />} />
        <Route path="/friendselect" element={<FriendSelectCookie />} />
        <Route path="/changeselect" element={<ChangeSelectCookie />} />
        <Route path="/completed" element={<CompletedMsg />} />
        <Route path="/loadingmsg" element={<LoadingMsg />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mycookie" element={<MyCookie />} />
        <Route path="/feedback" element={<Feedback />} />
        {/* <Route path='*' component={NotFound} /> */}
      </Route>
    </Routes>
  );
}

export default Router;
