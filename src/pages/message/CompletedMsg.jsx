import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import completedImg from "../../assets/completed_cookie.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { privateAxios, receiverAtom, remainAtom } from "../../utils/atom";

function CompletedMsg() {
  const [receiver, setReceiver] = useRecoilState(receiverAtom); // 받은 쿠키
  const [remain, setRemain] = useRecoilState(remainAtom); // 앞에서 클릭한 id
  const [info, setInfo] = useState([]);
  const axiosInstance = useRecoilValue(privateAxios);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .post(`api/msg/remain`, { receiver: parseInt(remain) })
      .then((res) => {
        setInfo(res.data);
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  return (
    <CompletedMsgBox>
      <div className="contents_container">
        <div className="completed_text">메세지 전송 완료!</div>
        <div className="completed_img">
          <img src={completedImg} alt="전송완료" width={300} />
        </div>
        <div className="completed_remain">
          <p className="completed_p">
            오늘 '{info.receiver_nickname}' 에게 보낼 쿠키는
            <br />
            {info.count}개 남아있어!
          </p>
        </div>
        <div className="completed_btn_box">
          <CompletedBtn>
            <Link to="/mymessage">쿠키함 가기</Link>
          </CompletedBtn>
          <CompletedBtn>
            <Link to="/searchcookie">쿠키 보내러 가기</Link>
          </CompletedBtn>
        </div>
      </div>
    </CompletedMsgBox>
  );
}

export default CompletedMsg;

const CompletedMsgBox = styled.div`
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

  .completed_text {
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
  }
  .completed_img {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .completed_remain {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    font-size: 0.9rem;
    align-items: center;
  }
  .completed_btn_box {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .completed_p {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 1rem;
    text-align: center;
    line-height: 25px;
  }
`;

const CompletedBtn = styled.button`
  width: 130px;
  height: 60px;
  border: 3px solid #7fa3ff;
  border-radius: 15px;
  background-color: #ffffff;
  font-family: "BRBA_B";
  font-size: 0.8rem;
  cursor: pointer;
  margin: 5px;
  text-align: center;
  font-size: 1rem;
  a {
    text-decoration: none;
    color: black;
  }
`;
