import React, { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import styled from "styled-components";
import { privateAxios, nicknameAtom } from "../../utils/atom";
import { Link, useNavigate } from "react-router-dom";

function MyPage() {
  const navigate = useNavigate();
  const axiosInstance = useRecoilValue(privateAxios);
  const [tempNickname, setTempNickname] = useState("");
  const [nickname, setNickname] = useRecoilState(nicknameAtom);

  const onChangeNickname = (e) => {
    setTempNickname(e.target.value);
  };
  const emoji1 =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  const emoji2 = /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g;

  // 닉네임 변경
  const changeNick = () => {
    if (tempNickname.length > 7) {
      alert("닉네임은 7글자 이하, 숫자, 알파벳, 한글만 사용 가능해! 🤭");
    } else if (tempNickname.match(/\s/g) || tempNickname.match(emoji1) || tempNickname.match(emoji2)) {
      alert("닉네임에 공백과 특수문자는 사용할 수 없어 ~ 🤭");
    } else {
      axiosInstance
        .patch(`api/auth/nickname/edit`, { nickname: tempNickname })
        .then((result) => {
          const { status } = result;
          console.log(status);
          if (status == 200) {
            setNickname(tempNickname);
            setTempNickname("");
            alert("닉네임 변경 완료 ! 🥳");
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert("이미 사용중인 닉네임이야! 🫣");
          } else if (error.response.status === 406) {
            alert("닉네임 변경 횟수를 모두 사용했어! 😭");
          }
        });
    }
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
          <NickChangeInput type="text" placeholder={nickname} maxlength="7" value={tempNickname} onChange={onChangeNickname} autoFocus />
          <NickChangeBtn onClick={changeNick}>닉네임변경</NickChangeBtn>
        </div>
        <div className="mypage_btn_box">
          <MypageBtn>
            <Link to="/mycookie">내 쿠키맛 확인</Link>
          </MypageBtn>
          <MypageBtn>
            <Link to="/mymessage">마이쿠키함</Link>
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
  a {
    text-decoration: none;
    color: black;
  }
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
