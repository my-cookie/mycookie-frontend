import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  getSenderSelector,
  postSenderIconAtom,
  privateAxios
} from "../utils/atom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function SenderCookie() {
  const senderData = useRecoilValue(getSenderSelector); // 전체 data
  const [senderIcon, setSenderIcon] = useState(); //얘도 전체
  const [postReadDate, setPostReadData] = useRecoilState(postSenderIconAtom); // 선택된 쿠키
  const navigate = useNavigate();
  const axiosInstance = useRecoilValue(privateAxios);
  const [newSender, setSender] = useState([]);

  const handleSenderDataChange = useCallback(() => {
    axiosInstance.get(`api/msg/sender`).then((res) => {
      console.log(res.data);
      setSender(res.data);
    });
  }, []);

  useEffect(() => {
    handleSenderDataChange();
  }, [handleSenderDataChange]);

  useEffect(() => {
    setSenderIcon(senderData);
  }, [senderData]);

  const sendHandler = (e) => {
    const select = senderIcon.filter(
      (senderIcon) => senderIcon.id == e.target.id
    );
    setPostReadData(select);
    console.log(select); // 클릭한 id
    navigate("/readmessage");
  };

  return (
    <MyContainer>
      {newSender &&
        newSender.map((newSender) => {
          return (
            <Button key={newSender.id} id={newSender.id} onClick={sendHandler}>
              <img
                src={newSender.flavor.img}
                id={newSender.id}
                alt="img"
                width={50}
              />
            </Button>
          );
        })}
    </MyContainer>
  );
}

export default SenderCookie;

const MyContainer = styled.div`
  padding: 10px;
  @media (min-width: 390px) {
  }
`;

const Button = styled.button`
  background: none;
  border: none;
`;
