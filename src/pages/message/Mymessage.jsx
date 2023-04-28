import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MsgContainer from "../../components/MsgContainer";
import { useRecoilValue } from "recoil";
import { privateAxios } from "../../utils/atom";
import LoadingLogin from "../loading/LoadingLogin";

function Mymessage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const axiosInstance = useRecoilValue(privateAxios);
  const [current, setCurrent] = useState([]);
  const [init, setInit] = useState(false);

  const currentHandler = (e) => {
    setOpen((open) => !open);
  };

  useEffect(() => {
    setTimeout(function () {
      axiosInstance.get(`api/auth/siteinfo/realtime`).then((res) => {
        console.log(res.data);
        setCurrent(res.data);
        setInit(true);
      });
    }, 1000);
  }, []);

  const sendCookieBtn = () => {
    navigate("/searchcookie");
  };

  return init ? (
    <MymessageContainer>
      <div className="contents_container">
        <div className="header_box">
          <div className="current">
            <CurrentUser>
              <EmojiBox>
                <CurrentUserBtn onClick={currentHandler}>
                  <Emoji>🟢</Emoji>현재 접속자 수{" "}
                  {current ? current.number.realtime_user : 0}
                </CurrentUserBtn>
              </EmojiBox>
              {open ? (
                <CurrentUserBox>
                  {current?.nicknames.map((current) => {
                    return <li key={current.id}>{current.nickname}</li>;
                  })}
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
        </div>
        <div className="message_btn">
          <SendBtn type="button" onClick={sendCookieBtn}>
            쿠키 보내러 가기
          </SendBtn>
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
    justify-content: center;
    height: 100%;
    font-family: "BRBA_B";
    margin: 0 auto;
    padding: 0 40px;
  }
  .header_box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .go_mypage {
  }
  .current {
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

const CurrentUser = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmojiBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Emoji = styled.p`
  font-size: 0.6rem;
  margin-right: 5px;
`;

const CurrentUserBox = styled.div`
  width: 80px;
  height: auto;
  max-height: 100px;
  border-radius: 10px;
  margin-top: 25px;
  background-color: #fff;
  list-style: none;
  padding: 10px;
  font-size: 0.8rem;
  z-index: 99;
  position: absolute;
  text-align: center;
  margin-left: 10px;
`;

const CurrentUserBtn = styled.button`
  display: flex;
  flex-direction: row;
  background: none;
  border: none;
  font-family: "BRBA_B";
`;
