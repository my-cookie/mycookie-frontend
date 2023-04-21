import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  getReceiverSelector,
  postReceiverIconAtom,
  privateAxios
} from "../utils/atom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function ReceiverCookie() {
  const receiverData = useRecoilValue(getReceiverSelector);
  const [receiverIcon, setReceiverIcon] = useState();
  const [readData, setReadData] = useRecoilState(postReceiverIconAtom);
  const axiosInstance = useRecoilValue(privateAxios);
  const [newReceiver, setNewReceiver] = useState([]);
  const navigate = useNavigate();

  const handleReceiverDataChange = useCallback(() => {
    axiosInstance.get(`api/msg/receiver`).then((res) => {
      console.log(res.data);
      setNewReceiver(res.data);
    });
  }, []);

  useEffect(() => {
    handleReceiverDataChange();
  }, [handleReceiverDataChange]);

  useEffect(() => {
    setReceiverIcon(receiverData);
  }, [receiverData]);

  const clickHandler = (e) => {
    const select = receiverIcon.filter(
      (receiverIcon) => receiverIcon.id == e.target.id
    );
    setReadData(select);
    console.log(select);
    navigate("/receiver_read_message");
  };

  return (
    <MyContainer>
      {newReceiver &&
        newReceiver.map((newReceiver) => {
          return (
            <Button
              key={newReceiver.id}
              id={newReceiver.id}
              onClick={clickHandler}
            >
              <img
                src={newReceiver.flavor.img}
                id={newReceiver.id}
                alt="img"
                width={50}
              />
            </Button>
          );
        })}
    </MyContainer>
  );
}

export default ReceiverCookie;

const MyContainer = styled.div`
  width: 100%;
  padding: 10px;
  @media (min-width: 390px) {
    width: 90%;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
`;
