import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loadingCookie from "../assets/loading_cookie.gif";
import { useRecoilState } from "recoil";
import { accessAtom } from "../utils/atom";

function KakaoLogin() {
  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get("code");
  const [accessToken, setAccessToken] = useRecoilState(accessAtom);

  const kakaoLoginCode = async () => {
    try {
      await axios.post(`api/auth/login`, { code }).then((result) => {
        const { status, data } = result;
        console.log(status);
        if (status === 200) {
          setAccessToken(data.tokens.access);
          navigate("/mymessage");
        } else if (status === 201 || status === 206) {
          navigate("/nickname", { state: { user_uuid: data.user_uuid } });
        } else {
          navigate("/");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    kakaoLoginCode();
  }, []);

  return (
    <div>
      {" "}
      <img src={loadingCookie} alt="loading" width={300} />
    </div>
  );
}

export default KakaoLogin;
