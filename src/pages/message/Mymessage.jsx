import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MsgContainer from "../../components/MsgContainer";
import { useRecoilValue } from "recoil";
import { currentUserAtom, currentUserNicknameAtom } from "../../utils/atom";
import LoadingLogin from "../loading/LoadingLogin";

function Mymessage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const current = useRecoilValue(currentUserAtom);
  const currentNickname = useRecoilValue(currentUserNicknameAtom);

  const currentHandler = (e) => {
    setOpen((open) => !open);
  };

  const sendCookieBtn = () => {
    navigate("/searchcookie");
  };

  return current ? (
    <MymessageContainer>
      <div className="contents_container">
        <div className="header_box">
          <div className="current">
            <CurrentUser>
              <EmojiBox>
                <Emoji>🟢</Emoji>접속자 {currentNickname.length}
                <CurrentUserBtn onClick={currentHandler}>누구?</CurrentUserBtn>
              </EmojiBox>
              {open ? (
                <CurrentUserBox>
                  <div className="scroll_inner">
                    {currentNickname.map((nickname, idx) => {
                      return <li key={idx}>{nickname}</li>;
                    })}
                  </div>
                </CurrentUserBox>
              ) : (
                ""
              )}
            </CurrentUser>
          </div>
          <div className="go_mypage">
            <MyPageBtn type="button">
              <Link to="/mypage">내정보</Link>
            </MyPageBtn>
          </div>
        </div>

        <div className="message_title">
          <MessageTitle>나의 쿠키함</MessageTitle>
        </div>

        <div className="message_container">
          <MsgContainer />
          <div className="message_btn">
            <SendBtn type="button" onClick={sendCookieBtn}>
              쿠키 보내러 가기
            </SendBtn>
          </div>
        </div>
      </div>
    </MymessageContainer>
  ) : (
    <LoadingLogin />
  );
}

export default Mymessage;

const MymessageContainer = styled.div`
  height: 100%;

  .contents_container {
    position: relative;
    display: flex;
    flex-flow: column;
    // justify-content: center;
    height: 100%;
    font-family: "BRBA_B";
    margin: 0 auto;
    padding: 0 40px;
  }

  .header_box {
    display: flex;
    width: 100%;
    height: 13%;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }

  .message_title {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
  }

  .message_container {
    width: 100%;
    height: 77%;
  }

  .message_btn {
    width: 100%;
    height: auto;
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

const CurrentUser = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmojiBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  font-size: 0.9rem;
`;

const Emoji = styled.p`
  font-size: 0.6rem;
  margin-right: 5px;
`;

const CurrentUserBox = styled.div`
  width: auto;
  height: auto;
  max-height: 100px;
  border-radius: 10px;
  margin-top: 30px;
  background-color: #fff;
  list-style: none;
  padding: 10px;
  font-size: 0.8rem;
  z-index: 99;
  position: absolute;
  // text-align: center;
  margin-left: 10px;
  line-height: 22px;
  overflow: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const CurrentUserBtn = styled.button`
  display: flex;
  flex-direction: row;
  background: none;
  border: 2px solid #7fa3ff;
  background-color: #fff;
  padding: 4px;
  border-radius: 10px;
  font-family: "BRBA_B";
  margin-left: 5px;
  font-size: 0.7rem;
  cursor: pointer;
`;
