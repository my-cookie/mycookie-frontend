import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getSenderSelector, postSenderIconAtom } from "../utils/atom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function SenderCookie() {
  const senderData = useRecoilValue(getSenderSelector);

  const [senderIcon, setSenderIcon] = useState();
  const [postReadDate, setPostReadData] = useRecoilState(postSenderIconAtom);
  const navigate = useNavigate();

  useEffect(() => {
    setSenderIcon(senderData);
  }, [senderData]);

  const sendHandler = (e) => {
    const select = senderIcon.filter((senderIcon) => senderIcon.id == e.target.id);
    setPostReadData(select);

    navigate("/readmessage");
  };

  return (
    <MyContainer>
      {senderIcon &&
        senderIcon.map((senderIcon) => {
          return (
            <Button key={senderIcon.id} id={senderIcon.id} onClick={sendHandler}>
              <img src={senderIcon.flavor.img} id={senderIcon.id} alt="img" width={50} />
            </Button>
          );
        })}
    </MyContainer>
  );
}

export default SenderCookie;

const MyContainer = styled.div`
  padding: 10px;
`;

const Button = styled.button`
  background: none;
  border: none;
`;
