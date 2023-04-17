import React from "react";
import styled from "styled-components";

function MyPage() {
  return (
    <MyPageBox>
      <div className="contents_container">
        <div className="mypage_title">마이페이지</div>
        <div className="mypage_nick">
          <NickChangeInput />
          <NickChangeBtn> 닉네임 변경</NickChangeBtn>
        </div>
        <div className="mypage_btn_box">
          <MypageBtn>내 쿠키 변경</MypageBtn>
          <MypageBtn>마이쿠키함 가기</MypageBtn>
        </div>
        <div className="mypage_btn_box">
          <MypageBtn>로그아웃</MypageBtn>
          <MypageBtn>탈퇴하기</MypageBtn>
        </div>
        <div className="mypage_btn_box">
          <ToMypageBtn>문의하기</ToMypageBtn>
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
    height: 10%;
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
  }
  .mypage_nick {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
  }

  .mypage_btn_box {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
  }
`;

const NickChangeInput = styled.input`
  width: 200px;
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
  width: 100px;
  height: 40px;
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
`;
