import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { privateAxios } from "../../utils/atom";
import { Link, useNavigate } from "react-router-dom";

function MyPage() {
  const navigate = useNavigate();
  const axiosInstance = useRecoilValue(privateAxios);
  const [nickname, setNickname] = useState("");

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  // 닉네임 변경
  const changeNick = () => {
    axiosInstance
      .patch(`api/auth/nickname/edit`, { nickname: nickname })
      .then((result) => {
        const { status } = result;
        console.log(status);
        if (nickname.length > 7) {
          alert("닉네임은 7글자 까지야! 🤭");
        } else if (status === 400) {
          alert("이미 사용중인 닉네임이야! 🫣");
        } else if (status === 406) {
          alert("닉네임 변경 횟수를 모두 사용했어! 😭");
        }
      })
      .catch((error) => console.log(error));
  };

  // 로그아웃
  const logoutHandler = () => {
    axiosInstance
      .post(`api/auth/logout`)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 회원탈퇴
  const signoutHandler = () => {
    axiosInstance
      .post(`api/auth/signout`)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MyPageBox>
      <div className="contents_container">
        <div className="mypage_title">마이페이지</div>
        <div className="mypage_nick">
          <NickChangeInput
            type="text"
            placeholder="닉네임 바꿀래?"
            maxlength="7"
            onChange={onChangeNickname}
          />
          <NickChangeBtn onClick={changeNick}>닉네임 변경</NickChangeBtn>
        </div>
        <div className="mypage_btn_box">
          <MypageBtn>
            <Link to="/changeselect">내 쿠키 변경</Link>
          </MypageBtn>
          <MypageBtn>
            <Link to="/mymessage">마이쿠키함 가기</Link>
          </MypageBtn>
        </div>
        <div className="mypage_btn_box">
          <MypageBtn onClick={logoutHandler}>로그아웃</MypageBtn>
          <MypageBtn onClick={signoutHandler}>탈퇴하기</MypageBtn>
        </div>
        <div className="mypage_btn_box">
          <ToMypageBtn>
            <Link to="/feedback">문의하기</Link>
          </ToMypageBtn>
        </div>
      </div>
    </MyPageBox>
  );
}

export default MyPage;

const MyPageBox = styled.div`
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
  .mypage_title {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    @media (min-width: 390px) {
      height: 10%;
      align-items: center;
    }
  }
  .mypage_nick {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    @media (min-width: 390px) {
      height: 35%;
      align-items: center;
    }
  }

  .mypage_btn_box {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const NickChangeInput = styled.input`
  width: 160px;
  height: 40px;
  border: none;
  background: none;
  border-bottom: 3px solid #7fa3ff;
  font-size: 1rem;
  font-family: "BRBA_B";
  box-sizing: border-box;
  padding-left: 10px;
  outline: none;
`;
const NickChangeBtn = styled.button`
  width: 110px;
  height: 50px;
  border: 3px solid #7fa3ff;
  border-radius: 20px;
  background-color: #ffffff;
  font-family: "BRBA_B";
  font-size: 1rem;
  cursor: pointer;
  margin-left: 10px;
`;

const MypageBtn = styled.button`
  width: 150px;
  height: 50px;
  border: 3px solid #7fa3ff;
  border-radius: 20px;
  background-color: #ffffff;
  font-family: "BRBA_B";
  font-size: 1rem;
  cursor: pointer;
  margin-left: 10px;
  a {
    text-decoration: none;
    color: black;
  }
`;

const ToMypageBtn = styled.button`
  width: 200px;
  height: 50px;
  border: 3px solid #7fa3ff;
  border-radius: 20px;
  background-color: #ffffff;
  font-family: "BRBA_B";
  font-size: 1rem;
  cursor: pointer;
  margin-left: 10px;
  a {
    text-decoration: none;
    color: black;
  }
`;
