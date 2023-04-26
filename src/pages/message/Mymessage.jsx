import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MsgContainer from "../../components/MsgContainer";

function Mymessage() {
  const navigate = useNavigate();

  const sendCookieBtn = () => {
    navigate("/searchcookie");
  };

  return (
    <MymessageContainer>
      <div className="contents_container">
        <div className="go_mypage">
          <MyPageBtn type="button">
            <Link to="/mypage">내정보</Link>
          </MyPageBtn>
        </div>
        <div className="message_title">
          <MessageTitle>나의 쿠키함</MessageTitle>
        </div>

        <div className="message_container">
          <MsgContainer />
        </div>
        <div className="message_btn">
          <SendBtn type="button" onClick={sendCookieBtn}>
            쿠키 보내러 가기
          </SendBtn>
        </div>
      </div>
    </MymessageContainer>
  );
}

export default Mymessage;

const MymessageContainer = styled.div`
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

  .go_mypage {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .message_title {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
  }

  .message_container {
    width: 100%;
    height: 60%;
  }

  .message_btn {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
    a {
      text-decoration: none;
      color: black;
    }
  }
`;
const MyPageBtn = styled.button`
  background-color: #7fa3ff;
  width: 55px;
  height: 55px;
  border: 3px solid white;
  font-family: "BRBA_B";
  border-radius: 50%;
  color: white;
  font-size: 0.7rem;
  a {
    color: #fff;
    text-decoration: none;
    padding: 5px 0;
  }
`;

const MessageTitle = styled.p`
  font-size: 1.5rem;
  padding-top: 10px;
`;

const SendBtn = styled.button`
  width: 150px;
  height: 50px;
  border: 3px solid #7fa3ff;
  border-radius: 15px;
  background-color: #ffffff;
  font-family: "BRBA_B";
  font-size: 1rem;
  cursor: pointer;
  margin-top: 30px;
  a {
    text-decoration: none;
    color: black;
  }
`;
