import React, { useCallback, useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { postReceiverIconAtom, privateAxios, receiveMsgStatusAtom, roomAtom, readingAtom, sendmsgAtom, tabIndexAtom } from "../utils/atom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

function ReceiverCookie() {
  const [readData, setReadData] = useRecoilState(postReceiverIconAtom);
  const axiosInstance = useRecoilValue(privateAxios);
  const [newReceiver, setNewReceiver] = useState([]);
  const [newMessage, setNewMessage] = useRecoilState(receiveMsgStatusAtom);
  const [currentroom, setCurrentroom] = useRecoilState(roomAtom);
  const [isReading, setIsReading] = useRecoilState(readingAtom);
  const [msg, setMsg] = useRecoilState(sendmsgAtom);
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useRecoilState(tabIndexAtom);

  const handleReceiverDataChange = useCallback(() => {
    axiosInstance.get(`api/msg/receiver`).then((res) => {
      setNewReceiver(res.data);
    });
  }, []);

  useEffect(() => {
    handleReceiverDataChange();
  }, [handleReceiverDataChange, newMessage]);

  const clickHandler = (e) => {
    const select = newReceiver.filter((newReceiver) => newReceiver.id == e.target.id);
    setReadData(select);
    if (select[0].is_read == false) {
      axiosInstance
        .post(`api/msg/read`, { message_id: select[0].id })
        .then((res) => {
          console.log(res.data);
          setIsReading(true);
          setMsg(select[0].id);
          setCurrentroom(res.data.sender_uuid.split("-").join(""));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(select);
    navigate("/receiver_read_message");
  };

  return (
    <MyContainer>
      <Tabs
        className="receive_tabs"
        defaultIndex={tabIndex[1]}
        onSelect={(index) => {
          console.log(index);
          setTabIndex([tabIndex[0], index]);
        }}
      >
        <div className="receive_tabs_message">
          <TabList className="receive_tab_list">
            <Tab className="receive_tab_all">전체편지</Tab>
            <Tab className="receive_tab_all">읽은편지</Tab>
            <Tab className="receive_tab_all">안읽은편지</Tab>
          </TabList>
        </div>
        <div className="receive_box">
          <TabPanel className="receiver_box_scroll">
            {newReceiver &&
              newReceiver.map((newReceiver) => {
                return (
                  <Button key={newReceiver.id} id={newReceiver.id} onClick={clickHandler}>
                    <img src={newReceiver.flavor.img} id={newReceiver.id} alt="img" width={50} />
                    {newReceiver.is_anonymous == false ? <p className="receiver_nickname">{newReceiver.sender.nickname}</p> : <p className="receiver_nickname">익명</p>}
                  </Button>
                );
              })}
          </TabPanel>
          <TabPanel className="receiver_box_scroll">
            {newReceiver &&
              newReceiver.map((newReceiver) => {
                if (newReceiver.is_read == true) {
                  return (
                    <Button key={newReceiver.id} id={newReceiver.id} onClick={clickHandler}>
                      <img src={newReceiver.flavor.img} id={newReceiver.id} alt="img" width={50} />
                      {newReceiver.is_anonymous == false ? <p className="receiver_nickname">{newReceiver.sender.nickname}</p> : <p className="receiver_nickname">익명</p>}
                    </Button>
                  );
                }
              })}
          </TabPanel>
          <TabPanel className="receiver_box_scroll">
            {newReceiver &&
              newReceiver.map((newReceiver) => {
                if (newReceiver.is_read == false) {
                  return (
                    <Button key={newReceiver.id} id={newReceiver.id} onClick={clickHandler}>
                      <img src={newReceiver.flavor.img} id={newReceiver.id} alt="img" width={50} />
                      {newReceiver.is_anonymous == false ? <p className="receiver_nickname">{newReceiver.sender.nickname}</p> : <p className="receiver_nickname">익명</p>}
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
    margin: 0 3px;
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

  .receiver_box_scroll {
    width: 100%;
    padding-left: 5px;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  a {
    text-decoration: none;
    color: black;
  }
`;
