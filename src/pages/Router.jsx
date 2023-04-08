import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import KakaoLogin from "./KakaoLogin";
import Login from "./Login";
import Mymessage from "./message/Mymessage";
import ReadMessage from "./message/ReadMessage";
import SearchCookie from "./SearchCookie";
import MyPage from "./user/MyPage";

import Nickname from "./user/Nickname";
import SelectCookie from "./user/SelectCookie";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/nickname" element={<Nickname />} />
        <Route path="/select" element={<SelectCookie />} />
        <Route path="/mymessage" element={<Mymessage />} />
        <Route path="/readmessage" element={<ReadMessage />} />
        <Route path="/searchcookie" element={<SearchCookie />} />
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/oauth/callback/kakao" element={<KakaoLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
