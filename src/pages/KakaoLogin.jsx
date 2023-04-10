import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axios";

function KakaoLogin() {
  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get("code");

  const kakaoLoginCode = async () => {
    try {
      await axiosInstance.post(`api/auth/login`, { code }).then((result) => {
        const { status } = result;
        console.log(status);
        if (status === 200) {
          navigate("/mymessage");
        } else if (status === 201 || status === 206) {
          navigate("/nickname");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    kakaoLoginCode();
  }, []);

  return <div>KakaoLogin</div>;
}

export default KakaoLogin;
