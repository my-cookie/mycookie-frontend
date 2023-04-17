import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import completedImg from "../../assets/completed_cookie.png";

function CompletedMsg() {
  return (
    <CompletedMsgBox>
      <div className="contents_container">
        <div className="completed_text">메세지 전송 완료!</div>
        <div className="completed_img">
          <img src={completedImg} alt="전송완료" width={300} />
        </div>
        <div className="completed_remain">
          <p>오늘 바보4에게 보낼 쿠키는 0개 남아있어!</p>
        </div>
        <div className="completed_btn_box">
          <CompletedBtn>
            <Link to="/mymessage">쿠키함 가기</Link>
          </CompletedBtn>
          <CompletedBtn>
            <Link to="/searchcookie">쿠키 보내러 가기</Link>
          </CompletedBtn>
        </div>
      </div>
    </CompletedMsgBox>
  );
}

export default CompletedMsg;

const CompletedMsgBox = styled.div`
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

  .completed_text {
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
  }
  .completed_img {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .completed_remain {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    font-size: 1rem;
    align-items: center;
  }
  .completed_btn_box {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CompletedBtn = styled.button`
  width: 130px;
  height: 60px;
  border: 3px solid #7fa3ff;
  border-radius: 15px;
  background-color: #ffffff;
  font-family: "BRBA_B";
  font-size: 0.8rem;
  cursor: pointer;
  margin: 5px;
  text-align: center;
  font-size: 1rem;
  a {
    text-decoration: none;
    color: black;
  }
`;
