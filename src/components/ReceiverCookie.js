import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  getReceiverSelector,
  postReceiverIconAtom,
  privateAxios
} from "../utils/atom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

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
      <Tabs className="receive_tabs">
        <div className="receive_tabs_message">
          <TabList className="receive_tab_list">
            <Tab className="receive_tab_all">전체편지</Tab>
            <Tab className="receive_tab_all">읽은편지</Tab>
            <Tab className="receive_tab_all">안읽은편지</Tab>
          </TabList>
        </div>
        <div className="receive_box">
          <TabPanel>
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
                    <p className="receiver_nickname">
                      {newReceiver.receiver.nickname}
                    </p>
                  </Button>
                );
              })}
          </TabPanel>
          <TabPanel>
            {newReceiver &&
              newReceiver.map((newReceiver) => {
                if (newReceiver.is_read == true) {
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
                      <p className="receiver_nickname">
                        {newReceiver.receiver.nickname}
                      </p>
                    </Button>
                  );
                }
              })}
          </TabPanel>
          <TabPanel>
            {newReceiver &&
              newReceiver.map((newReceiver) => {
                if (newReceiver.is_read == false) {
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
                      <p className="receiver_nickname">
                        {newReceiver.receiver.nickname}
                      </p>
                    </Button>
                  );
                }
              })}
          </TabPanel>
        </div>
      </Tabs>
    </MyContainer>
  );
}

export default ReceiverCookie;

const MyContainer = styled.div`
  width: 100%;

  .receive_tabs_message {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
  .receive_tab_list {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .receive_tab_all {
    width: 70px;
    height: 45px;
    border: 3px solid #fff;
    border-radius: 15px;
    background-color: #7fa3ff;
    font-family: "BRBA_B";
    font-size: 0.7rem;
    box-sizing: border-box;
    padding-top: 13px;
    cursor: pointer;
    text-align: center;
    margin: 0 5px;
  }
  .receive_box {
    width: 100%;
    box-sizing: border-box;
    overflow: scroll;
  }

  .receive_box::-webkit-scrollbar {
    display: none;
  }

  .receiver_nickname {
    font-family: "BRBA_B";
    font-size: 0.7rem;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
`;
