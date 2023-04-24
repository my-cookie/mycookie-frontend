import React, { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessAtom, uuidAtom, roomAtom, sendingAtom, privateAxios, sendmsgAtom } from "../../utils/atom";
import { w3cwebsocket as W3CWebSocket } from "websocket";

function PrivateLayout() {
  const navigate = useNavigate();
  const [init, setInit] = useState(false);
  const [accessToken, setAccessToken] = useRecoilState(accessAtom);
  const [uuid, setUuid] = useRecoilState(uuidAtom);
  const [currentroom, setCurrentroom] = useRecoilState(roomAtom);
  const [isSending, setIsSending] = useRecoilState(sendingAtom);
  const [msg, setMsg] = useRecoilState(sendmsgAtom);

  const client = useRef("");
  const axiosInstance = useRecoilValue(privateAxios);

  useEffect(() => {
    if (init && currentroom) {
      client.current = new W3CWebSocket(process.env.REACT_APP_WS_URL + currentroom + "/"); //gets room_name from the state and connects to the backend server
      console.log("connected");

      if (isSending === false) {
        client.current.onopen = function () {
          console.log("WebSocket Client Connected");
          client.current.onmessage = function (e) {
            console.log("메시지와따", e);
            const data = JSON.parse(e.data);
            console.log(data);
            axiosInstance
              .patch(`api/msg/receiver/alarm`, { message_id: data.msg_id })
              .then((result) => {
                const { status } = result;
                if (status === 200) {
                  console.log(result.data);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          };
        };
      }
      if (isSending === true) {
        client.current.onopen = function () {
          client.current.send(
            JSON.stringify({
              type: "chat_message",
              msg_id: msg,
              receiver_uuid: currentroom,
            })
          );
          setCurrentroom(uuid);
          setIsSending(false);
          setMsg(null);
        };
      }
    }
  }, [init, currentroom]);

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (init && !accessToken) {
      console.log("access token 재발급");
      axios
        .post(`/api/auth/access`, {})
        .then((response) => {
          setAccessToken(response.data.access);
          setUuid(response.data.user.uuid.split("-").join(""));
          setCurrentroom(response.data.user.uuid.split("-").join(""));
          console.log("재요청");
        })
        .catch((err) => {
          console.log(err);
          return navigate("/");
        });
    }
  }, [accessToken]);

  return init ? (
    <>
      <MainLayout>
        <div className="contents_container">
          <Outlet />
        </div>
      </MainLayout>
    </>
  ) : (
    ""
  );
}

export default PrivateLayout;

const MainLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  & > .contents_container {
    width: 100%;
    max-width: 550px;
    height: calc(100% - 10vh);
    border-radius: 40px;
    border: 12px solid #fff;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
    background-color: #fff386;
  }
  @media (min-width: 1000px) {
    & > .contents_container {
      max-width: 360px;
      max-height: 800px;
    }
  }
  // 전체 화면
  @media (max-width: 500px) {
    padding: 0;
    & > .contents_container {
      height: 100%;
      border: none;
      margin: 0;
      border-radius: 0px;
    }
  }
`;
