import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  postReceiverIconAtom,
  postSenderIconAtom,
  privateAxios
} from "../utils/atom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function UnReadLetter() {
  const navigate = useNavigate();
  const axiosInstance = useRecoilValue(privateAxios);
  const [allData, setAllData] = useState([]);
  const [readData, setReadData] = useRecoilState(postReceiverIconAtom);
  const [receiveRead, setReceiveRead] = useState(); // 데이터 새로 담음

  const [sendRead, setSendRead] = useState([]); // 데이터 새로 담음
  const [postReadDate, setPostReadData] = useRecoilState(postSenderIconAtom); // 선택된 쿠키

  const allCookieCallback = useCallback(() => {
    axiosInstance.get(`api/msg/total`).then((res) => {
      console.log(res.data);
      setAllData(res.data);
    });
  }, []);

  useEffect(() => {
    allCookieCallback();
  }, [allCookieCallback]);

  // receiver
  useEffect(() => {
    setReceiveRead(allData.receive);
  }, [allData.receive]);

  // sender
  useEffect(() => {
    setSendRead(allData.send);
  }, [allData.send]);

  const clickReadHandler = (e) => {
    console.log(e.target.id);
    const select = receiveRead.filter(
      (receiveRead) => receiveRead.id == e.target.id
    );
    setReadData(select);
    // setReceiveRead(select);
    console.log(select);
    navigate("/receiver_read_message");
  };

  // sender
  const clickSendHandler = (e) => {
    const select = sendRead.filter((sendRead) => sendRead.id == e.target.id);
    setPostReadData(select);
    console.log(select); // 클릭한 id
    navigate("/readmessage");
  };

  return (
    <ReadLetterContainer>
      {receiveRead &&
        receiveRead.map((receiveRead) => {
          if (receiveRead.is_read == true) {
            return (
              <Button key={receiveRead.id} id={receiveRead.id}>
                <img
                  src={receiveRead.flavor.img}
                  id={receiveRead.id}
                  alt="img"
                  width={50}
                  onClick={clickReadHandler}
                />
              </Button>
            );
          }
        })}
      {sendRead &&
        sendRead.map((sendRead) => {
          if (sendRead.is_read == true) {
            return (
              <Button key={sendRead.id} id={sendRead.id}>
                <img
                  src={sendRead.flavor.img}
                  id={sendRead.id}
                  alt="img"
                  width={50}
                  onClick={clickSendHandler}
                />
              </Button>
            );
          }
        })}
    </ReadLetterContainer>
  );
}

export default UnReadLetter;

const ReadLetterContainer = styled.div`
  width: 100%;
  padding: 10px;
`;
const Button = styled.button`
  background: none;
  border: none;
`;
