import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  getSenderSelector,
  postSenderIconAtom,
  privateAxios
} from "../utils/atom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

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
      <Tabs className="send_tabs">
        <div className="send_tabs_message">
          <TabList className="send_tab_list">
            <Tab className="send_tab_all">전체편지</Tab>
            <Tab className="send_tab_all">읽은편지</Tab>
            <Tab className="send_tab_all">안읽은편지</Tab>
          </TabList>
        </div>
        <div className="send_box">
          <TabPanel>
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
                  </Button>
                );
              })}
          </TabPanel>
          <TabPanel>
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
                    </Button>
                  );
                }
              })}
          </TabPanel>
          <TabPanel>
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
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .send_tab_all {
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
  .send_box {
    width: 100%;
    box-sizing: border-box;
    overflow: scroll;
  }

  .send_box::-webkit-scrollbar {
    display: none;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
`;
