import React, { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessAtom, uuidAtom, roomAtom, sendingAtom, privateAxios, sendmsgAtom, receiveMsgStatusAtom, readingAtom } from "../../utils/atom";
import { w3cwebsocket as W3CWebSocket } from "websocket";

function PrivateLayout() {
  const navigate = useNavigate();
  const [init, setInit] = useState(false);
  const [accessToken, setAccessToken] = useRecoilState(accessAtom);
  const [uuid, setUuid] = useRecoilState(uuidAtom);
  const [currentroom, setCurrentroom] = useRecoilState(roomAtom);
  const [isSending, setIsSending] = useRecoilState(sendingAtom);
  const [isReading, setIsReading] = useRecoilState(readingAtom);
  const [msg, setMsg] = useRecoilState(sendmsgAtom);
  const [newMessage, setNewMessage] = useRecoilState(receiveMsgStatusAtom);

  const client = useRef("");
  const axiosInstance = useRecoilValue(privateAxios);

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (init && currentroom) {
      client.current = new W3CWebSocket(process.env.REACT_APP_WS_URL + currentroom + "/"); //gets room_name from the state and connects to the backend server
      console.log("connected");

      if (isSending === false && isReading === false) {
        client.current.onopen = function () {
          console.log("WebSocket Client Connected");
          console.log(currentroom);
          client.current.onmessage = function (e) {
            if (!e.data.is_read) {
              const data = JSON.parse(e.data);
              console.log(data);
              axiosInstance
                .get(`api/msg/receiver/alarm?message_id=${data.msg_id}`)
                .then((result) => {
                  const { status, data } = result;
                  if (status === 200) {
                    alert(`${data.is_anonymous ? "익명" : data.sender.nickname}에게 새로운 쿠키가 도착했어 !`);
                    newMessage ? setNewMessage(false) : setNewMessage(true);
                    console.log(result.data);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              console.log("메시지 읽음");
              newMessage ? setNewMessage(false) : setNewMessage(true);
            }
          };
        };
      }
      if (isSending === true && isReading === false) {
        client.current.onopen = function () {
          console.log("WebSocket Client Connected");
          client.current.send(
            JSON.stringify({
              type: "chat_message",
              msg_id: msg,
            })
          );
          setCurrentroom(uuid);
          setIsSending(false);
          setMsg(null);
        };
      }

      if (isSending === false && isReading === true) {
        client.current.onopen = function () {
          console.log("WebSocket Client Connected");
          console.log("읽음");
          client.current.send(
            JSON.stringify({
              type: "chat_message",
              msg_id: msg,
              is_read: true,
            })
          );
          setCurrentroom(uuid);
          setIsReading(false);
          setMsg(null);
        };
      }
    }
  }, [init, currentroom]);

  useEffect(() => {
    if (!accessToken) {
      console.log("access token 재발급");
      axios
        .post(`/api/auth/access`, {})
        .then((response) => {
          setAccessToken(response.data.access);
        })

        .catch((err) => {
          console.log(err);
          return navigate("/");
        });
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      console.log("uuid 받기");
      axiosInstance
        .get(`/api/auth/info/uuid`)
        .then((response) => {
          setUuid(response.data.uuid.split("-").join(""));
          setCurrentroom(response.data.uuid.split("-").join(""));
          console.log("재요청");
        })

        .catch((err) => {
          console.log(err);
          return navigate("/");
        });
    }
  }, [accessToken]);

  return accessToken ? (
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
