import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Nickname() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState();
  const [uuid, setUuid] = useState("");
  const location = useLocation();

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

    if (nickname.length >= 7) {
      alert("닉네임은 7글자까지 가능해요!");
    } else {
      axios
        .post(`api/auth/nickname`, { nickname, user_uuid: uuid })
        .then((result) => {
          const { status } = result;
          console.log(status);
          if (status === 206) {
            alert("이미 사용중인 닉네임 입니다!");
            window.location.reload();
          } else if (status === 200) {
            navigate("/select", {
              state: { user_uuid: uuid, nickname: nickname },
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
              <NicknameInput type="text" name="nickname" maxlength="7" value={nickname} onChange={handleChange} />
            </div>

            <div className="nickname_btn">
              <LikeBtn type="submit">좋아!</LikeBtn>
            </div>
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
  width: 200px;
  height: 40px;
  font-family: "BRBA_B";
  font-size: 1.2rem;
  background-color: #fff386;
  border-bottom: 3px solid black;
  outline: none;
  position: relative;
  /* &:focus {
    background: #fff386;
  } */
`;

const XmarkBtn = styled.button`
  width: 30px;
  height: 25px;
  font-size: 1.2rem;
  border: none;
  background-color: #fff386;
  position: absolute;
  cursor: pointer;
  top: 44%;
  left: 75%;
  transform: translate(-40%, -70%);

  @media (max-width: 1000px) {
    top: 44%;
    left: 66%;
    transform: translate(-40%, -65%);
  }
  @media (max-width: 500px) {
    top: 45%;
    left: 70%;
    transform: translate(-45%, -70%);
  }
`;

const LikeBtn = styled.button`
  width: 150px;
  height: 50px;
  border: 3px solid #7fa3ff;
  border-radius: 20px;
  background-color: #ffffff;
  font-family: "BRBA_B";
  font-size: 1rem;
  cursor: pointer;
`;
