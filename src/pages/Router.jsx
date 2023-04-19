import React from "react";
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

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Login />} />
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
        <Route path="/completed" element={<CompletedMsg />} />
        <Route path="/loadingmsg" element={<LoadingMsg />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/oauth/callback/kakao" element={<KakaoLogin />} />
      </Route>
    </Routes>
  );
}

export default Router;
