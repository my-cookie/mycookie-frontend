import styled from "styled-components";
import MainCookie from "../assets/main_cookie_img.png";
import Kakao from "../assets/kakao.png";

function Login() {
  return (
    <LoginContainer>
      <ImgContainer>
        <img src={MainCookie} alt="사빠쿠" className="main_cookie" />
      </ImgContainer>
      <KakaoLogin>
        <KakaoBtn src={Kakao} alt="카카오버튼" />
      </KakaoLogin>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  height: 100%;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: center;
  position: absolute;
  .main_cookie {
    width: 90%;
    height: 95%;
  }
`;

const KakaoLogin = styled.button`
  width: 70%;
  height: 55px;
  overflow: hidden;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  z-index: 999;
  margin: 0 auto;
  top: 550px;
  display: flex;
  justify-content: center;
  background-color: #fee500;

  @media (max-width: 500px) {
    top: 720px;
  }
`;

const KakaoBtn = styled.img`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
