import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Nickname() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState();
  const [uuid, setUuid] = useState("");
  const location = useLocation();
  const emoji1 =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  const emoji2 = /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g;

  useEffect(() => {
    try {
      setUuid(location.state.user_uuid);
    } catch {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setNickname(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (nickname.length > 6) {
      alert("닉네임은 6글자 이하, 숫자, 알파벳, 한글만 사용 가능해! 🤭");
    } else if (nickname.match(/\s/g) || nickname.match(emoji1) || nickname.match(emoji2)) {
      alert("닉네임에 공백과 특수문자는 사용할 수 없어 ~ 🤭");
    } else {
      axios
        .post(`api/auth/nickname`, { nickname, user_uuid: uuid })
        .then((result) => {
          const { status } = result;
          if (status === 206) {
            alert("이미 사용중인 닉네임 입니다!");
            window.location.reload();
          } else if (status === 200) {
            navigate("/select", {
              state: { user_uuid: uuid, nickname: nickname },
            });
          }
        })
        .catch((error) => {});
    }
  };

  return (
    <>
      <NicknameContainer>
        <div className="contents_container">
          <div className="nickname_box">
            <NicknameTextBox>
              <p>안녕? 나는 </p>
              <p style={{ color: "#F65353" }}>사랑에 빠진 쿠키야!</p>
              <p>나랑 같이 쿠키를 구워볼래?</p>
              <p>여기에 너의 이름을 알려줘!</p>
            </NicknameTextBox>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="nickname_input">
              <NicknameInput type="text" name="nickname" maxlength="6" value={nickname} onChange={handleChange} />
              <LikeBtn type="submit">좋아!</LikeBtn>
            </div>

            <div className="nickname_btn"></div>
          </form>
        </div>
      </NicknameContainer>
    </>
  );
}

export default Nickname;

const NicknameContainer = styled.div`
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

  .nickname_box {
    width: 100%;
    height: 170px;
  }
  .nickname_input {
    display: flex;
    justify-content: center;
    height: 250px;
  }

  .nickname_btn {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const NicknameTextBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 50px;
  font-size: 1.2rem;
  line-height: 30px;
  padding-top: 60px;
`;

const NicknameInput = styled.input`
  border: none;
  width: 130px;
  height: 40px;
  font-family: "BRBA_B";
  font-size: 1.2rem;
  background-color: #fff386;
  border-bottom: 3px solid black;
  outline: none;
  position: relative;
  margin-right: 10px;
`;

const LikeBtn = styled.button`
  width: 70px;
  height: 45px;
  border: 3px solid #7fa3ff;
  border-radius: 20px;
  background-color: #ffffff;
  font-family: "BRBA_B";
  font-size: 1rem;
  cursor: pointer;
`;
