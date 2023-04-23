import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import AllCookie from "./AllCookie";
import ReadLetter from "./ReadLetter";
import UnReadLetter from "./UnReadLetter";

function AllContainer() {
  return (
    <AllContainer>
      <Tabs className="tabs">
        <div className="message_select_btn">
          <TabList className="tab_list">
            <div className="tab_list_letter">
              <Tab className="tab_all_btn">
                {/* <img src={Btn} alt="button" width={60} /> */}
                전체편지
              </Tab>
              <Tab className="tab_all">읽은편지</Tab>
              <Tab className="tab_all_un">안읽은편지</Tab>
            </div>
          </TabList>
        </div>
        <div className="tab_panel">
          <div className="message_background">
            <TabPanel>
              <AllCookie />
            </TabPanel>
            <TabPanel>
              <ReadLetter />
            </TabPanel>
            <TabPanel>
              <UnReadLetter />
            </TabPanel>
          </div>
        </div>
      </Tabs>
    </AllContainer>
  );
}

export default AllContainer;
