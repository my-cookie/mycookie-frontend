import styled from "styled-components";
import MainCookie from "../assets/cookie_main.png";
import Kakao from "../assets/kakao.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const navigate = useNavigate();

  const KakaoLoginBtn = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const GuestLoginBtn = () => {
    axios
      .post(`/api/auth/login`, { code: "guest" })
      .then((result) => {
        const { status, data } = result;
        if (status === 201) {
          navigate("/nickname", { state: { user_uuid: data.user_uuid } });
        } else {
          navigate("/");
        }
      })
      .catch((error) => {});
  };

  return (
    <LoginContainer>
      <div className="contents_container">
        <div className="img_box">
          <img src={MainCookie} alt="사빠쿠" className="main_cookie" />
        </div>

        <div className="kakaoBtn_box">
          <KakaoLogin onClick={KakaoLoginBtn}>
            <KakaoBtn src={Kakao} alt="카카오버튼" />
          </KakaoLogin>
          <KakaoLogin className="guestBtn_box" onClick={GuestLoginBtn}>
            게스트로 로그인
          </KakaoLogin>
        </div>
      </div>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  height: 94%;
  .contents_container {
    height: 100%;
    max-width: 450px;
    margin: 0 auto;
    padding: 0 30px;
    position: relative;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    border: 20px solid #fff386;
    border-radius: 40px;
  }

  .img_box {
    width: 100%;
    height: 70%;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .main_cookie {
    height: 100%;
    max-width: 100%;
    object-fit: contain;
  }

  .kakaoBtn_box {
    width: 100%;
  }
  .guestBtn_box {
    width: 100%;
    height: 50px;
    margin-top: 10px;
    font-family: "BRBA_B";
    font-size: 1em;
    background-color: #d7c7fa;
  }
`;

const KakaoLogin = styled.button`
  width: 100%;
  height: 55px;
  overflow: hidden;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
`;

const KakaoBtn = styled.img`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
