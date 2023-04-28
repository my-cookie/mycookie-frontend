import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  postSenderIconAtom,
  privateAxios,
  sendMsgStatusAtom,
  tabIndexAtom
} from "../utils/atom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

function SenderCookie() {
  const [postReadDate, setPostReadData] = useRecoilState(postSenderIconAtom); // 선택된 쿠키
  const navigate = useNavigate();
  const [readMessage, setReadMessage] = useRecoilState(sendMsgStatusAtom);
  const axiosInstance = useRecoilValue(privateAxios);
  const [newSender, setSender] = useState([]);
  const [tabIndex, setTabIndex] = useRecoilState(tabIndexAtom);

  const handleSenderDataChange = useCallback(() => {
    axiosInstance.get(`api/msg/sender`).then((res) => {
      setSender(res.data);
    });
  }, []);

  useEffect(() => {
    handleSenderDataChange();
  }, [handleSenderDataChange, readMessage]);

  const sendHandler = (e) => {
    const select = newSender.filter((newSender) => newSender.id == e.target.id);
    setPostReadData(select);
    navigate("/readmessage");
  };

  return (
    <MyContainer>
      <Tabs
        className="send_tabs"
        defaultIndex={tabIndex[1]}
        onSelect={(index) => {
          setTabIndex([tabIndex[0], index]);
        }}
      >
        <div className="send_tabs_message">
          <TabList className="send_tab_list">
            <Tab className={tabIndex[1] == 0 ? "selected_tab" : "send_tab"}>
              전체편지
            </Tab>
            <Tab className={tabIndex[1] == 1 ? "selected_tab" : "send_tab"}>
              읽은편지
            </Tab>
            <Tab className={tabIndex[1] == 2 ? "selected_tab" : "send_tab"}>
              안읽은편지
            </Tab>
          </TabList>
        </div>
        <div className="send_box">
          <div className="send_scroll">
            <TabPanel className="send_box_scroll">
              {newSender &&
                newSender.map((newSender) => {
                  return (
                    <Button
                      key={newSender.id}
                      id={newSender.id}
                      onClick={sendHandler}
                    >
                      <img
                        src={newSender.flavor.img}
                        id={newSender.id}
                        alt="img"
                        width={50}
                      />
                      <p className="sender_nickname">
                        {newSender.receiver.nickname}
                      </p>
                    </Button>
                  );
                })}
              <p>&nbsp;</p>
            </TabPanel>
            <TabPanel className="send_box_scroll">
              {newSender &&
                newSender.map((newSender) => {
                  if (newSender.is_read == true) {
                    return (
                      <Button
                        key={newSender.id}
                        id={newSender.id}
                        onClick={sendHandler}
                      >
                        <img
                          src={newSender.flavor.img}
                          id={newSender.id}
                          alt="img"
                          width={50}
                        />
                        <p className="sender_nickname">
                          {newSender.receiver.nickname}
                        </p>
                      </Button>
                    );
                  }
                })}
              <p>&nbsp;</p>
            </TabPanel>
            <TabPanel className="send_box_scroll">
              {newSender &&
                newSender.map((newSender) => {
                  if (newSender.is_read == false) {
                    return (
                      <Button
                        key={newSender.id}
                        id={newSender.id}
                        onClick={sendHandler}
                      >
                        <img
                          src={newSender.flavor.img}
                          id={newSender.id}
                          alt="img"
                          width={50}
                        />
                        <p className="sender_nickname">
                          {newSender.receiver.nickname}
                        </p>
                      </Button>
                    );
                  }
                })}
              <p>&nbsp;</p>
            </TabPanel>
          </div>
        </div>
      </Tabs>
    </MyContainer>
  );
}

export default SenderCookie;

const MyContainer = styled.div`
  width: 100%;

  .send_tabs_message {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
  .send_tab_list {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    padding-top: 10px;

    height: 50px;
    border-radius: 20px;
  }
  .send_tab {
    width: 70px;
    height: 40px;
    font-family: "BRBA_B";
    font-size: 0.7rem;
    border: 3px solid #7fa3ff;
    border-radius: 10px;
    box-sizing: border-box;
    padding-top: 11px;
    cursor: pointer;
    text-align: center;
    margin: 0 3px;
    background-color: #fff;
  }
  .selected_tab {
    width: 70px;
    height: 40px;
    font-family: "BRBA_B";
    font-size: 0.7rem;
    border: 3px solid #7fa3ff;
    border-radius: 10px;
    box-sizing: border-box;
    padding-top: 11px;
    cursor: pointer;
    text-align: center;
    margin: 0 3px;
    background-color: #7fa3ff;
  }
  .send_box {
    width: 100%;
    box-sizing: border-box;
  }

  .send_box::-webkit-scrollbar {
    display: none;
  }

  .sender_nickname {
    font-family: "BRBA_B";
    font-size: 0.6rem;
  }
  .send_box_scroll {
    width: 100%;
    line-height: 90px;
    display: flex;
    flex-wrap: wrap;
  }
  .send_scroll {
    width: 100%;
    height: 200px;
    overflow: scroll;
    overflow-x: hidden;
  }
  .send_scroll::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Button = styled.button`
  width: 67px;
  height: 69px;
  background: none;
  border: none;
  a {
    text-decoration: none;
    color: black;
  }
  cursor: pointer;
`;
