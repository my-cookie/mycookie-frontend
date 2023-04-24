import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  getReceiverSelector,
  postReceiverIconAtom,
  privateAxios
} from "../../utils/atom";

function ReadMessage() {
  const RselectID = useRecoilValue(postReceiverIconAtom); // 선택한 id
  const receiverData = useRecoilValue(getReceiverSelector); // 전체 데이터
  const axiosInstance = useRecoilValue(privateAxios);
  const navigate = useNavigate();

  const deleteMsg = () => {
    axiosInstance
      .patch(`api/msg/receiver/delete`, { message_id: RselectID[0].id })
      .then((result) => {
        const { status } = result;
        if (status === 200) {
          console.log("메세지 삭제 완료");
          navigate("/mymessage", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const spamMsg = () => {
    axiosInstance
      .post(`api/msg/spam`, { message: RselectID[0].id })
      .then((result) => {
        const { status } = result;
        if (status === 201) {
          alert("신고완료!😡");
        } else if (status === 406) {
          alert("이미 신고된 쿠키야!");
        }
      });
  };

  const time = RselectID[0].created_at;

  function uTcLocal(time) {
    let localDate = new Date(time);

    let nowMonth = (localDate.getMonth() + 1).toString();
    if (nowMonth.length === 1) nowMonth = "0" + nowMonth;

    let nowDate = localDate.getDate().toString();
    if (nowDate.length === 1) nowDate = "0" + nowDate;

    let nowHours = localDate.getHours().toString();
    if (nowHours.length === 1) nowHours = "0" + nowHours;

    let nowMinutes = localDate.getMinutes().toString();
    if (nowMinutes.length === 1) nowMinutes = "0" + nowMinutes;

    let changeDate =
      localDate.getFullYear() +
      "-" +
      nowMonth +
      "-" +
      nowDate +
      " " +
      nowHours +
      ":" +
      nowMinutes;
    return changeDate;
  }

  console.log(uTcLocal(time));

  return (
    <ReadMessageContainer>
      <div className="contents_container">
        <MessageBoxDiv>
          <div className="read_cookie">
            <SelectCookieImg src={RselectID[0].flavor.img} />
          </div>
          <div className="read_letter">
            <div className="message_background">
              <ToBox>
                <ToRead>{RselectID[0].receiver.nickname} 에게</ToRead>
              </ToBox>
              <TextBox>
                <ReadMessageText>{RselectID[0].content}</ReadMessageText>
              </TextBox>
              <FromBox>
                <FromRead>{RselectID[0].sender.nickname}</FromRead>
                <FromDate>{uTcLocal(time)}</FromDate>
              </FromBox>
            </div>
          </div>
        </MessageBoxDiv>

        <div className="read_btn">
          <CheckBtn>
            <Link to="/mymessage">확인</Link>
          </CheckBtn>
          <DeleteBtn onClick={deleteMsg}>삭제</DeleteBtn>
          <CrimeBtn onClick={spamMsg}>신고</CrimeBtn>
        </div>
      </div>
    </ReadMessageContainer>
  );
}

export default ReadMessage;

const ReadMessageContainer = styled.div`
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

  .read_cookie {
    width: 100%;
    padding: 30px 0;
    display: flex;
    justify-content: center;
  }

  .read_letter {
    width: 100%;
    height: 60%;
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
  .message_background {
    width: 100%;
    height: 350px;
    padding: 20px;
    border-radius: 40px;
    border: 1px solid #a7a7a7;
    background-color: #f8f8f8;
  }
  .read_btn {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const SelectCookieImg = styled.img`
  width: 60px;
`;

const ToBox = styled.div`
  width: 100%;
  height: 40px;
`;
const TextBox = styled.div`
  width: 100%;
  height: 290px;
`;
const FromBox = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

const ToRead = styled.p``;
const ReadMessageText = styled.p``;
const FromRead = styled.p`
  font-size: 1rem;
  padding-bottom: 10px;
  display: flex;
  justify-content: flex-end;
`;

const FromDate = styled.p`
  font-size: 0.8rem;
  font-family: "BRBA_B";
  padding-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  color: #6c6c6c;
`;

const CheckBtn = styled.button`
  width: 70px;
  height: 40px;
  border: 3px solid #7fa3ff;
  border-radius: 15px;
  background-color: #ffffff;
  font-family: "BRBA_B";
  font-size: 0.8rem;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;
  a {
    text-decoration: none;
    color: black;
    padding: 20%;
  }
`;

const DeleteBtn = styled.button`
  width: 70px;
  height: 40px;
  border: 3px solid #7fa3ff;
  border-radius: 15px;
  background-color: #ffffff;
  font-family: "BRBA_B";
  font-size: 0.8rem;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;
  a {
    text-decoration: none;
    color: black;
  }
`;

const CrimeBtn = styled.button`
  width: 70px;
  height: 40px;
  border: 3px solid #7fa3ff;
  border-radius: 15px;
  background-color: #ffffff;
  font-family: "BRBA_B";
  font-size: 0.8rem;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;

  a {
    text-decoration: none;
    color: black;
  }
`;

const MessageBoxDiv = styled.div``;
