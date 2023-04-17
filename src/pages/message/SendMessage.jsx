import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  anonymousAtom,
  contentAtom,
  receiverAtom,
  senderAtom
} from "../../utils/atom";

function SendMessage() {
  const receiverNickname = useRecoilValue(receiverAtom);
  const senderName = useRecoilValue(senderAtom);

  const [content, setContent] = useRecoilState(contentAtom);
  const [is_anonymous, setIs_anonymous] = useRecoilState(anonymousAtom);
  const navigate = useNavigate();

  const checkHandler = () => {
    setIs_anonymous(!is_anonymous);
  };

  const handleSetValue = (e) => {
    setContent(e.target.value);
  };

  const cookieSend = () => {
    navigate("/friendselect");
  };

  return (
    <SendMessageContainer>
      <div className="contents_container">
        <div className="send_title">
          <SendTitle>사랑을 담아</SendTitle>
          <SendTitle>쿠키를 구워봐!</SendTitle>
        </div>
        <div className="send_letter">
          <div className="message_background">
            <ToBox>
              <ToRead>{receiverNickname.nickname} </ToRead>
              에게
            </ToBox>
            <TextBox>
              <ReadMessageText
                placeholder="친구에게 보낼 쿠키를 작성해봐!"
                onChange={(e) => handleSetValue(e)}
              ></ReadMessageText>
            </TextBox>
            <FromBox>
              {is_anonymous == true ? (
                <p>익명 보냄</p>
              ) : (
                <FromRead>{senderName} 보냄</FromRead>
              )}
            </FromBox>
          </div>
        </div>
        <div className="send_btn">
          <CheckBox>
            <SendInput
              type="checkbox"
              checked={is_anonymous}
              onChange={(e) => checkHandler(e)}
            />
            <SendCheck>익명으로 보내기</SendCheck>
          </CheckBox>
          <SendBtn type="submit" onClick={cookieSend}>
            쿠키 보내기!
          </SendBtn>
        </div>
      </div>
    </SendMessageContainer>
  );
}

export default SendMessage;

const SendMessageContainer = styled.div`
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

  .send_title {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }

  .send_letter {
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
  .send_btn {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;

const SendTitle = styled.p`
  font-size: 1.4rem;
  padding-bottom: 10px;
`;

const ToBox = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
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
`;

const ToRead = styled.p`
  padding: 10px;
  font-size: 1.3rem;
  color: #7fa3ff;
`;
const ReadMessageText = styled.textarea`
  width: 100%;
  height: 90%;
  font-family: "BRBA_B";
  padding: 10px;
  box-sizing: border-box;
  border: none;
  background: none;
  font-size: 1rem;
  line-height: 25px;
  resize: none;
`;
const FromRead = styled.p`
  font-size: 1rem;
`;

const CheckBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;
const SendInput = styled.input``;

const SendCheck = styled.p`
  font-size: 0.8rem;
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
  margin-top: 10px;
  margin-right: 10px;
`;
