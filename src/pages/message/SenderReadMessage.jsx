import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { postSenderIconAtom, privateAxios } from "../../utils/atom";

function ReadMessage() {
  const selectID = useRecoilValue(postSenderIconAtom);
  const axiosInstance = useRecoilValue(privateAxios);
  const navigate = useNavigate();

  const deleteMsg = () => {
    if (window.confirm("정말 삭제할거야 ?")) {
      axiosInstance
        .patch(`api/msg/sender/delete`, { message_id: selectID[0].id })
        .then((result) => {
          const { status } = result;
          if (status === 200) {
            //정말 삭제하시겠습니까?
            alert("삭제 완료 !");
            navigate("/mymessage");
          }
        })
        .catch((err) => {});
    }
  };

  const time = selectID[0].created_at;

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

  return (
    <ReadMessageContainer>
      <div className="contents_container">
        <div>
          <MessageBox>
            <div className="read_cookie">
              <SelectCookieImg src={selectID[0].flavor.img} />
            </div>
            <div className="read_letter">
              <div className="message_background">
                <ToBox>
                  <ToRead>{selectID[0].receiver.nickname} 에게</ToRead>
                </ToBox>
                <TextBox>
                  <ReadMessageText>{selectID[0].content}</ReadMessageText>
                </TextBox>
                <FromBox>
                  {selectID[0].is_anonymous == false ? (
                    <FromRead>{selectID[0].sender.nickname}</FromRead>
                  ) : (
                    <FromRead>익명</FromRead>
                  )}
                  <FromDate>{uTcLocal(time)}</FromDate>
                </FromBox>
              </div>
            </div>
          </MessageBox>
        </div>

        <div className="read_btn">
          <CheckBtn>
            <Link to="/mymessage">확인</Link>
          </CheckBtn>
          <DeleteBtn onClick={deleteMsg}>삭제</DeleteBtn>
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
    height: 30%;
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
  .message_background {
    width: 100%;
    height: 280px;
    padding: 20px;
    border-radius: 40px;
    border: 1px solid #a7a7a7;
    background-color: #f8f8f8;
  }
  .read_btn {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
  }
`;

const SelectCookieImg = styled.img`
  width: 80px;
`;

const ToBox = styled.div`
  width: 100%;
  height: 40px;
`;
const TextBox = styled.div`
  width: 100%;
  height: 200px;
`;
const FromBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

const ToRead = styled.p``;
const ReadMessageText = styled.p`
  line-height: 24px;
`;
const FromRead = styled.p`
  padding-bottom: 10px;
  font-size: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const FromDate = styled.p`
  font-size: 0.8rem;
  font-family: "BRBA_B";
  padding-bottom: 10px;
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
  margin-top: 20px;
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
  margin-top: 20px;
  margin-right: 10px;
`;

// const CrimeBtn = styled.button`
//   width: 70px;
//   height: 40px;
//   border: 3px solid #7fa3ff;
//   border-radius: 15px;
//   background-color: #ffffff;
//   font-family: "BRBA_B";
//   font-size: 0.8rem;
//   cursor: pointer;
//   margin-top: 20px;
//   margin-right: 10px;
// `;

const MessageBox = styled.div``;
