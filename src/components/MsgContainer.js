import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";
import ReceiverCookie from "./ReceiverCookie";
import SenderCookie from "./SenderCookie";
import { tabIndexAtom } from "../utils/atom";

function MsgContainer() {
  const [tabIndex, setTabIndex] = useRecoilState(tabIndexAtom);

  return (
    <MyMsgContainer>
      <Tabs className="tabs" defaultIndex={tabIndex[0]} onSelect={(index) => setTabIndex([index, tabIndex[1]])}>
        <div className="message_select_btn">
          <TabList className="tab_list">
            <div className="tab_list_letter">
              <Tab className={tabIndex[0] == 0 ? "tab_selected" : "tab_letter"}>받은편지</Tab>
              <Tab className={tabIndex[0] == 1 ? "tab_selected" : "tab_letter"}>보낸편지</Tab>
            </div>
          </TabList>
        </div>
        <div className="tab_panel">
          <div className="message_background">
            <TabPanel>
              <ReceiverCookie />
            </TabPanel>
            <TabPanel>
              <SenderCookie />
            </TabPanel>
          </div>
        </div>
      </Tabs>
    </MyMsgContainer>
  );
}

export default MsgContainer;

const MyMsgContainer = styled.div`
  .tabs {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .message_select_btn {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    @media (max-width: 500px) {
      width: 100%;
      margin-bottom: 20px;
    }
  }
  .tab_list {
    display: flex;
    justify-content: center;
    flex-direction: column;
    @media (min-width: 1000px) {
      width: 100%;
    }
    @media (max-width: 500px) {
      width: 100%;
    }
  }
  .tab_list_letter {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    text-align: center;
  }
  .tab_list_all {
    display: flex;
    justify-content: center;
    flex-direction: row;
    outline: none;
  }
  .tab_letter {
    width: 75px;
    height: 45px;
    border: 3px solid #7fa3ff;
    border-radius: 10px;
    background-color: #ffffff;
    font-family: "BRBA_B";
    font-size: 0.78rem;
    box-sizing: border-box;
    padding-top: 12px;
    cursor: pointer;
    text-align: center;
    margin: 0 5px;
    @media (max-width: 1000px) {
      width: 80px;
      font-size: 0.8rem;
      padding-top: 12px;
    }
    @media (max-width: 500px) {
      width: 80px;
      font-size: 0.9rem;
      padding-top: 12px;
    }
  }

  .tab_selected {
    background-color: #7fa3ff;
    width: 75px;
    height: 45px;
    border: 3px solid #7fa3ff;
    border-radius: 10px;
    font-family: "BRBA_B";
    font-size: 0.78rem;
    box-sizing: border-box;
    padding-top: 12px;
    cursor: pointer;
    text-align: center;
    margin: 0 5px;
    @media (max-width: 1000px) {
      width: 80px;
      font-size: 0.8rem;
      padding-top: 12px;
    }
    @media (max-width: 500px) {
      width: 80px;
      font-size: 0.9rem;
      padding-top: 12px;
    }
  }

  .tab_all_btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.6rem;
    width: 100px;
  }
  .tab_all {
    width: 75px;
    height: 45px;
    border: 3px solid #fff;
    border-radius: 15px;
    background-color: #7fa3ff;
    font-family: "BRBA_B";
    font-size: 0.78rem;
    cursor: pointer;
    box-sizing: border-box;
    padding: 9px;
    @media (max-width: 1000px) {
      width: 80px;
      font-size: 0.8rem;
      padding-top: 12px;
    }
    @media (max-width: 500px) {
      width: 80px;
      font-size: 0.9rem;
      padding-top: 12px;
    }
  }
  .tab_all_un {
    width: 75px;
    height: 45px;
    border: 3px solid #fff;
    border-radius: 15px;
    background-color: #7fa3ff;
    font-family: "BRBA_B";
    cursor: pointer;
    font-size: 0.78rem;
    box-sizing: border-box;
    padding: 7px;
    @media (max-width: 1000px) {
      width: 80px;
      font-size: 0.8rem;
      padding-top: 12px;
    }
    @media (max-width: 500px) {
      width: 80px;
      font-size: 0.79rem;
      padding-top: 12px;
    }
  }
  .message_background {
    width: 100%;
    height: 250px;
    border-radius: 40px;
    border: 1px solid #a7a7a7;
    background-color: #f8f8f8;
    overflow-y: scroll;
    /* &::-webkit-scrollbar {
      width: 5px;
      height: 50px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background: #ccc;
    } */
  }
  .tab_panel {
    box-sizing: border-box;
    padding: 10px;
  }
`;
