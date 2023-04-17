import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getReceiverSelector, postReceiverIconAtom } from "../utils/atom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function ReceiverCookie() {
  const receiverData = useRecoilValue(getReceiverSelector);
  const [receiverIcon, setReceiverIcon] = useState();
  const [readData, setReadData] = useRecoilState(postReceiverIconAtom);
  const navigate = useNavigate();

  useEffect(() => {
    setReceiverIcon(receiverData);
  }, [receiverData]);

  const clickHandler = (e) => {
    const select = receiverIcon.filter((receiverIcon) => receiverIcon.id == e.target.id);
    setReadData(select);

    navigate("/receiver_read_message");
  };

  return (
    <MyContainer>
      {receiverIcon &&
        receiverIcon.map((receiverIcon) => {
          return (
            <Button key={receiverIcon.id} id={receiverIcon.id} onClick={clickHandler}>
              <img src={receiverIcon.flavor.img} id={receiverIcon.id} alt="img" width={50} />
            </Button>
          );
        })}
    </MyContainer>
  );
}

export default ReceiverCookie;

const MyContainer = styled.div`
  padding: 10px;
`;

const Button = styled.button`
  background: none;
  border: none;
`;
