import React, { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserNicknameAtom, accessAtom, uuidAtom, roomAtom, sendingAtom, nicknameAtom, privateAxios, sendmsgAtom, currentUserAtom, receiveMsgStatusAtom, readingAtom, sendMsgStatusAtom, receiveMessageAtom } from "../../utils/atom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import toast, { Toaster } from "react-hot-toast";

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
  // const [newMessage, setNewMessage] = useRecoilState(receiveMsgStatusAtom);
  const [readMessage, setReadMessage] = useRecoilState(sendMsgStatusAtom);
  const [newReceiver, setNewReceiver] = useRecoilState(receiveMessageAtom);

  const client = useRef(null);
  const axiosInstance = useRecoilValue(privateAxios);
  const [current, setCurrent] = useRecoilState(currentUserAtom);
  const [currentNickname, setCurrentNickname] = useRecoilState(currentUserNicknameAtom);
  const [temp, setTemp] = useState([]);

  // window.addEventListener(
  //   "focus",
  //   function () {
  //     if (accessToken && currentroom && client.current.readyState === client.current.CLOSED) {
  //       // console.log("재연결");
  //       client.current = new W3CWebSocket(process.env.REACT_APP_WS_URL + currentroom + "/"); //gets room_name from the state and connects to the backend server
  //     }
  //   },
  //   false
  // );

  useEffect(() => {
    if (accessToken) {
      setTimeout(function () {
        axiosInstance
          .get(`api/auth/siteinfo/realtime`)
          .then((res) => {
            setCurrent(res.data.number.realtime_user);
            setCurrentNickname(
              res.data.nicknames.map((el) => {
                return el.nickname;
              })
            );
          })
          .catch((err) => {
            navigate("/");
          });
      }, 1000);

      setInterval(function () {
        axiosInstance
          .get(`api/auth/siteinfo/realtime`)
          .then((res) => {
            if (
              currentroom &&
              !res.data.nicknames
                .map((el) => {
                  return el.nickname;
                })
                .includes(nickname)
            ) {
              setCurrentNickname([
                ...res.data.nicknames.map((el) => {
                  return el.nickname;
                }),
                nickname,
              ]);
              setCurrent(res.data.number.realtime_user + 1);
            } else {
              setCurrent(res.data.number.realtime_user);
              setCurrentNickname(
                res.data.nicknames.map((el) => {
                  return el.nickname;
                })
              );
              // console.log("계속");
            }

            if (currentroom && client.current.readyState === client.current.CLOSED) {
              // console.log("재연결");
              axiosInstance
                .get(`api/auth/websocket`)
                .then((res) => {})
                .catch((err) => {
                  navigate("/");
                });
              client.current = new W3CWebSocket(process.env.REACT_APP_WS_URL + currentroom + "/"); //gets room_name from the state and connects to the backend server
            }
          })
          .catch((err) => {
            navigate("/");
          });
      }, 3000);
    }
  }, [accessToken]);

  const notify = (sender) =>
    toast(`${sender}(으)로 부터 쿠키 도착`, {
      icon: "💌",
    });

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (temp.length == 1 && !newReceiver.includes(temp[0])) {
      setNewReceiver((newReceiver) => [temp[0], ...newReceiver]);
      setTemp([]);
    }
  }, [temp]);

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
                  if (status === 200 && !temp.includes(data)) {
                    setTemp([data]);
                    data.is_anonymous ? notify("익명") : notify(data.sender.nickname);

                    // newMessage ? setNewMessage(false) : setNewMessage(true);
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
        client.current.onerror = function (error) {
          navigate("/");
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

          axiosInstance
            .get(`api/auth/websocket`)
            .then((res) => {})
            .catch((err) => {
              navigate("/");
            });
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

          axiosInstance
            .get(`api/auth/websocket`)
            .then((res) => {})
            .catch((err) => {
              navigate("/");
            });
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
        .get(`api/auth/websocket`)
        .then((res) => {})
        .catch((err) => {
          navigate("/");
        });

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

  const KakaoLoadOne = () => {
    let ins = document.createElement("ins");
    let scr = document.createElement("script");

    ins.className = "kakao_ad_area";
    ins.style = "display:none; width:100%;";
    scr.async = "true";
    scr.type = "text/javascript";
    scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    ins.setAttribute("data-ad-width", "300");
    ins.setAttribute("data-ad-height", "50");
    ins.setAttribute("data-ad-unit", "DAN-YEs1x1UgfqpVWI3m");

    document.querySelector(".adfitOne").appendChild(ins);
    document.querySelector(".adfitOne").appendChild(scr);
  };

  // useEffect를 통해서 바로 불러옴
  useEffect(() => {
    if (accessToken) {
      KakaoLoadOne();
    }
  }, [accessToken]);

  return accessToken ? (
    <>
      <MainLayout>
        <div className="contents_container">
          <div className="adfitOne"></div>
          <Toaster position="top-center" reverseOrder={false} />
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
