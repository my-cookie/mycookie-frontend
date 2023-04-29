import React, { useEffect } from "react";
import styled from "styled-components";
import loadingCookie from "../../assets/loading_cookie.gif";

function LoadingLogin() {
  return (
    <LoadingLoginBox>
      <div className="contents_container">
        <div className="loading_img">
          <img src={loadingCookie} alt="loading" className="cookie_img" width={300} />
        </div>
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
  .loading_img {
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .cookie_img {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
