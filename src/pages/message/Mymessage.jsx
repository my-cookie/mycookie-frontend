import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import ReceiverCookie from "../../components/ReceiverCookie";
import SenderCookie from "../../components/SenderCookie";
import { useRecoilValue } from "recoil";
import { privateAxios } from "../../utils/atom";

function Mymessage() {
  const navigate = useNavigate();
  const [viewPage, setViewPage] = useState(true);
  const [readPage, setReadPage] = useState(true);
  const [newReceiver, setNewReceiver] = useState({});
  const axiosInstance = useRecoilValue(privateAxios);

  const handleReceiverDataChange = useCallback(() => {
    axiosInstance.get(`api/msg/receiver`).then((res) => {
      console.log(res.data);
    });
  }, [newReceiver]);

  useEffect(() => {
    handleReceiverDataChange();
  }, [handleReceiverDataChange]);

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
        <div className="message_select_btn">
          <div>
            <MessageReceived onClick={() => setViewPage(true)}>
              받은쿠키
            </MessageReceived>
            <MessageSent onClick={() => setViewPage(false)}>
              보낸쿠키
            </MessageSent>
          </div>
          <div>
            <AllCookie onClick={() => setViewPage(true)}>전체쿠키</AllCookie>
            <ReadCookie onClick={() => setReadPage(true)}>읽은쿠키</ReadCookie>
            <UnReadCookie onClick={() => setReadPage(false)}>
              안읽은쿠키
            </UnReadCookie>
          </div>
        </div>
        <div className="message_container">
          <div className="message_background">
            {viewPage ? <ReceiverCookie /> : <SenderCookie />}
            {/* {viewPage && (
              <>
                <SenderCookie />
              </>
            )}
            {readPage ? (
              <div>
                <Button
                  key={receiverData.id}
                  id={receiverData.id}
                  // onClick={clickHandler}
                >
                  <img
                    src={receiverData.flavor}
                    id={receiverData.id}
                    alt="img"
                    width={50}
                  />
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  key={senderData.id}
                  id={senderData.id}
                  // onClick={clickHandler}
                >
                  <img
                    src={senderData.flavor}
                    id={senderData.id}
                    alt="img"
                    width={50}
                  />
                </Button>
              </div>
            )} */}
          </div>
          <div className="message_btn">
            <SendBtn type="button" onClick={sendCookieBtn}>
              쿠키 보내러 가기
            </SendBtn>
          </div>
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
    height: 10%;
    display: flex;
    justify-content: flex-end;
  }
  .message_title {
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }
  .message_select_btn {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .message_container {
    width: 100%;
    height: 70%;
  }

  .message_background {
    width: 100%;
    height: 300px;
    border-radius: 40px;
    border: 1px solid #a7a7a7;
    background-color: #f8f8f8;
  }
  .message_btn {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
  }
`;
const MyPageBtn = styled.button`
  background-color: #7fa3ff;
  width: 45px;
  height: 45px;
  border: 3px solid white;
  font-family: "BRBA_B";
  border-radius: 50%;
  color: white;
  font-size: 0.6rem;
  margin-top: 15px;
  a {
    color: #fff;
    text-decoration: none;
  }
`;

const MessageTitle = styled.p`
  font-size: 1.5rem;
  padding-top: 10px;
`;

const MessageReceived = styled.button`
  width: 80px;
  height: 40px;
  border: 3px solid #7fa3ff;
  border-radius: 15px;
  background-color: #ffffff;
  font-family: "BRBA_B";
  font-size: 0.8rem;
  cursor: pointer;
  margin-right: 10px;
`;
const MessageSent = styled.button`
  width: 80px;
  height: 40px;
  border: 3px solid #7fa3ff;
  border-radius: 15px;
  background-color: #ffffff;
  font-family: "BRBA_B";
  font-size: 0.8rem;
  cursor: pointer;
  margin-left: 10px;
`;

const AllCookie = styled.button`
  width: 65px;
  height: 40px;
  border: 3px solid #fff;
  border-radius: 15px;
  background-color: #7fa3ff;
  font-family: "BRBA_B";
  font-size: 0.6rem;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;
`;
const ReadCookie = styled.button`
  width: 65px;
  height: 40px;
  border: 3px solid #fff;
  border-radius: 15px;
  background-color: #7fa3ff;
  font-family: "BRBA_B";
  font-size: 0.6rem;
  cursor: pointer;
  margin-right: 10px;
`;
const UnReadCookie = styled.button`
  width: 65px;
  height: 40px;
  border: 3px solid #fff;
  border-radius: 15px;
  background-color: #7fa3ff;
  font-family: "BRBA_B";
  font-size: 0.6rem;
  cursor: pointer;
`;

const SendBtn = styled.button`
  width: 150px;
  height: 50px;
  border: 3px solid #7fa3ff;
  border-radius: 15px;
  background-color: #ffffff;
  font-family: "BRBA_B";
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 30px;
`;

// const Button = styled.button`
//   background: none;
//   border: none;
// `;
