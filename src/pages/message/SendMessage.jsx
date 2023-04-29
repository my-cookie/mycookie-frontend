import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { anonymousAtom, contentAtom, receiverAtom, senderAtom } from "../../utils/atom";
import toast from "react-hot-toast";

function SendMessage() {
  const receiverNickname = useRecoilValue(receiverAtom);
  const senderName = useRecoilValue(senderAtom);
  const [content, setContent] = useRecoilState(contentAtom);
  const [is_anonymous, setIs_anonymous] = useRecoilState(anonymousAtom);
  const navigate = useNavigate();
  const emoji1 =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

  const notify = (message) =>
    toast(`${message}`, {
      icon: "🍪",
    });

  const checkHandler = () => {
    setIs_anonymous(!is_anonymous);
  };

  const handleSetValue = (e) => {
    setContent(e.target.value.replace(emoji1, ""));
  };

  const cookieSend = () => {
    if (content.length === 0) {
      notify("정성을 1g 더 넣어볼까 ?! 😉");
    } else {
      navigate("/friendselect");
    }
  };

  useEffect(() => {
    if (receiverNickname == "") {
      navigate("/mymessage");
    }
  }, []);

  return (
    <SendMessageContainer>
      <div className="contents_container">
        <div className="send_title">
          <SendTitle>마음을 담아</SendTitle>
          <SendTitle>쿠키를 구워봐!</SendTitle>
        </div>
        <div className="send_letter">
          <div className="message_background">
            <ToBox>
              <ToRead>{receiverNickname.nickname} </ToRead>
              에게
            </ToBox>
            <TextBox>
              <ReadMessageText placeholder="친구에게 보낼 쿠키를 작성해봐!" onChange={(e) => handleSetValue(e)} value={content}></ReadMessageText>
            </TextBox>
            <FromBox>{is_anonymous == true ? <p>익명 보냄</p> : <FromRead>{senderName} 보냄</FromRead>}</FromBox>
          </div>
        </div>
        <div className="send_btn">
          <CheckBox>
            <SendInput type="checkbox" checked={is_anonymous} onChange={(e) => checkHandler(e)} />
            <SendCheck>익명으로 보내기</SendCheck>
          </CheckBox>
          <SendBtn type="button" onClick={cookieSend}>
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
    display: flex;
    position: relative;
    flex-flow: column;
    // justify-content: center;
    height: 100%;
    font-family: "BRBA_B";
    margin: 0 auto;
    padding: 0 40px;
  }

  .send_title {
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }

  .send_letter {
    display: flex;
    width: 100%;
    height: 370px;
    margin-top: 10px;
    justify-content: center;
  }
  .message_background {
    width: 100%;
    height: 300px;
    padding: 20px;
    border-radius: 40px;
    border: 1px solid #a7a7a7;
    background-color: #f8f8f8;
  }
  .send_btn {
    width: 100%;
    height: 15%;
    display: flex;
    // justify-content: center;
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
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TextBox = styled.div`
  width: 100%;
  height: 250px;
`;
const FromBox = styled.div`
  width: 100%;
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
  outline: none;
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
