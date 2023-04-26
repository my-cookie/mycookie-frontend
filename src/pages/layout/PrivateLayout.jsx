import React, { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessAtom, uuidAtom, roomAtom, sendingAtom, nicknameAtom, privateAxios, sendmsgAtom, receiveMsgStatusAtom, readingAtom, sendMsgStatusAtom } from "../../utils/atom";
import { w3cwebsocket as W3CWebSocket } from "websocket";

function PrivateLayout() {
  const navigate = useNavigate();
  const [init, setInit] = useState(false);
  const [accessToken, setAccessToken] = useRecoilState(accessAtom);
  const [uuid, setUuid] = useRecoilState(uuidAtom);
  const [nickname, setNickname] = useRecoilState(nicknameAtom);
  const [currentroom, setCurrentroom] = useRecoilState(roomAtom);
  const [isSending, setIsSending] = useRecoilState(sendingAtom);
  const [isReading, setIsReading] = useRecoilState(readingAtom);
  const [msg, setMsg] = useRecoilState(sendmsgAtom);
  const [newMessage, setNewMessage] = useRecoilState(receiveMsgStatusAtom);
  const [readMessage, setReadMessage] = useRecoilState(sendMsgStatusAtom);

  const client = useRef("");
  const axiosInstance = useRecoilValue(privateAxios);

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (init && currentroom) {
      client.current = new W3CWebSocket(process.env.REACT_APP_WS_URL + currentroom + "/"); //gets room_name from the state and connects to the backend server

      if (isSending === false && isReading === false) {
        client.current.onopen = function () {
          client.current.onmessage = function (e) {
            const data = JSON.parse(e.data);
            if (!data.is_read) {
              axiosInstance
                .get(`api/msg/receiver/alarm?message_id=${data.msg_id}`)
                .then((result) => {
                  const { status, data } = result;
                  if (status === 200) {
                    alert(`${data.is_anonymous ? "익명" : data.sender.nickname}에게 새로운 쿠키가 도착했어 !`);
                    newMessage ? setNewMessage(false) : setNewMessage(true);
                  }
                })
                .catch((err) => {});
            } else {
              readMessage ? setReadMessage(false) : setReadMessage(true);
            }
          };
        };
        client.current.onclose = function () {
          setTimeout(function () {
            client.current = new W3CWebSocket(process.env.REACT_APP_WS_URL + currentroom + "/");
          }, 100);
        };
        client.current.onerror = function () {
          navigate("/");
          alert("네트워크 오류 ! 다시 접속해줘 🥹");
        };
      }
      if (isSending === true && isReading === false) {
        client.current.onopen = function () {
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
      axios
        .post(`/api/auth/access`, {})
        .then((response) => {
          setAccessToken(response.data.access);
        })

        .catch((err) => {
          return navigate("/");
        });
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      axiosInstance
        .get(`/api/auth/info/uuid`)
        .then((response) => {
          setNickname(response.data.nickname);
          setUuid(response.data.uuid.split("-").join(""));
          setCurrentroom(response.data.uuid.split("-").join(""));
        })

        .catch((err) => {
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
