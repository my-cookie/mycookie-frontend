import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loadingCookie from "../../assets/loading_cookie.gif";

function LoadingLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      //   navigate("/completed");
    }, 3000);
  }, []);
  return (
    <LoadingLoginBox>
      <div className="contents_container">
        <img src={loadingCookie} alt="loading" />
      </div>
    </LoadingLoginBox>
  );
}

export default LoadingLogin;

const LoadingLoginBox = styled.div`
  height: 100%;

  .contents_container {
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: center;
    height: 100%;
    font-family: "BRBA_B";
    margin: 0 auto;
    padding: 0 40px;
  }
`;
