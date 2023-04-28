import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { receiverAtom } from "../../utils/atom";
import loadingCookie from "../../assets/cookie.gif";
import { useRecoilState } from "recoil";

function LoadingMsg() {
  const navigate = useNavigate();
  const [receiver, setReceiver] = useRecoilState(receiverAtom);

  useEffect(() => {
    if (receiver == "") {
      navigate("/mymessage");
    } else {
      setTimeout(() => {
        setReceiver("");

        navigate("/completed");
      }, 3000);
    }
  }, []);
  return (
    <LoadingMsgBox>
      <div className="contents_container">
        <div className="loading_cookie_box">
          <img src={loadingCookie} alt="loading" width={300} />
        </div>
      </div>
    </LoadingMsgBox>
  );
}

export default LoadingMsg;

const LoadingMsgBox = styled.div`
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
  .loading_cookie_box {
    display: flex;
    justify-content: center;
  }
`;
