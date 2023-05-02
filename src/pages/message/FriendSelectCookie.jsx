import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { anonymousAtom, contentAtom, privateAxios, receiverAtom, sendingAtom, roomAtom, sendmsgAtom } from "../../utils/atom";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingLogin from "../loading/LoadingLogin";

function FriendSelectCookie() {
  const navigate = useNavigate();
  const [receiver, setReceiver] = useRecoilState(receiverAtom);
  const [content, setContent] = useRecoilState(contentAtom);
  const is_anonymous = useRecoilValue(anonymousAtom);
  const [cookie, setCookie] = useState([]);
  const [flavor, setFlavors] = useState("");
  const axiosInstance = useRecoilValue(privateAxios);
  const [currentroom, setCurrentroom] = useRecoilState(roomAtom);
  const [isSending, setIsSending] = useRecoilState(sendingAtom);
  const [msg, setMsg] = useRecoilState(sendmsgAtom);
  const [loading, setLoading] = useState(false);

  async function getCookie() {
    try {
      const res = await axios.get(`api/flavor/cookies`);
      setCookie(res.data);
    } catch (error) {}
  }

  const notify = (message) =>
    toast(`${message}`, {
      icon: "🍪",
    });

  useEffect(() => {
    getCookie();
    if (receiver == "") {
      navigate("/mymessage");
    }
  }, []);

  const handleClickPlus = (e) => {
    setFlavors(`${e.target.id}`);
  };

  useEffect(() => {
    if (loading) {
      axiosInstance
        .post(`api/msg/save`, {
          receiver: parseInt(receiver.id),
          content,
          flavor: parseInt(flavor),
          is_anonymous,
        })
        .then((result) => {
          const { status, data } = result;
          if (status === 201) {
            if (data.is_success == false) {
              if (data.remain > 0) {
                notify(`전송 실패 : ${receiver.nickname}(이)가 좋아하는 쿠키 맛이 아니야 😢\n한번 더 도전해 볼까!\n남은 기회 : ${data.remain}`);
              } else {
                setContent("");
                navigate("/mymessage");
                notify(`${receiver.nickname}(이)가에게 보낼 쿠키를 다 소진했어!😥\n아쉽지만 메시지함으로 이동할게 !`);
                setReceiver("");
              }
            } else {
              setContent("");
              setCurrentroom(data.receiver_uuid.split("-").join(""));
              setIsSending(true);
              setMsg(data.msg_id);
              navigate("/loadingmsg");
            }
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);

          setContent("");
          if (error.response.status === 429) {
            notify(`${receiver.nickname}에게 보낼 쿠키를 다 소진했어!😥`);
            navigate("/mymessage");
          } else if (error.response.status === 406 || error.response.status === 400) {
            notify("친구가 쿠키를 받을 수 없는 상태야 ... 🥲");
            navigate("/mymessage");
          }
          setReceiver("");
        });
    }
  }, [loading]);

  const selectBtn = () => {
    if (flavor.length === 0) {
      notify(`${receiver.nickname}(이)가 좋아하는 쿠키맛을 골라줘 ~`);
    } else {
      setLoading(true);
    }
  };

  return loading ? (
    <LoadingLogin />
  ) : (
    <FriendSelectBox>
      <div className="contents_container">
        <div className="friend_select_title">
          <FriendSelectTitle>{receiver.nickname}(이)가 좋아하는</FriendSelectTitle>
          <FriendSelectTitle>쿠키맛은 뭘까?</FriendSelectTitle>

          <FriendSelectTip>hint. 상대방이 좋아하는 쿠키맛으로만 보낼 수 있어!</FriendSelectTip>
        </div>

        <div className="select_cookie">
          <div className="select_cookie_back">
            <CookieListBox>
              {cookie &&
                cookie?.map((cookie) => {
                  return flavor.includes(`${cookie.id}`) ? (
                    <button className="cookie_all_btn" id={cookie.id} key={cookie.id}>
                      <li className="cookie_list" id={cookie.id}>
                        <img style={{ backgroundColor: "orange" }} src={cookie.img} alt={cookie.name} id={cookie.id} className="cookie_img" />
                        <p className="cookie_btn" id={cookie.id}>
                          {cookie.name}
                        </p>
                      </li>
                    </button>
                  ) : (
                    <button className="cookie_all_btn" id={cookie.id} onClick={handleClickPlus} key={cookie.id}>
                      <li className="cookie_list" id={cookie.id}>
                        <img src={cookie.img} alt={cookie.name} id={cookie.id} className="cookie_img" />
                        <p className="cookie_btn" id={cookie.id}>
                          {cookie.name}
                        </p>
                      </li>
                    </button>
                  );
                })}
            </CookieListBox>
          </div>
        </div>
        <div className="friendSelect_btn">
          <FriendSelectBtn type="button" onClick={selectBtn}>
            선택완료!
          </FriendSelectBtn>
        </div>
      </div>
    </FriendSelectBox>
  );
}

export default FriendSelectCookie;

const FriendSelectBox = styled.div`
  height: 100%;
  .contents_container {
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: center;
    height: 100%;
    font-family: "BRBA_B";
    margin: 0 auto;
    padding: 0 40px;
  }

  .friend_select_title {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .select_cookie {
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: center;
  }
  .select_cookie_back {
    width: 100%;
    height: 300px;
    border-radius: 40px;
    border: 1px solid #a7a7a7;
    background-color: #f8f8f8;
    padding: 10px;
  }
  .cookie_list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .cookie_img {
    width: 100px;
    border-radius: 10px;
  }
  .cookie_btn {
    width: 80px;
    height: 25px;
    border: 3px solid #7fa3ff;
    border-radius: 15px;
    background-color: #ffffff;
    font-family: "BRBA_B";
    font-size: 0.8rem;
    cursor: pointer;
    margin-top: 5px;
    text-align: center;
    align-items: center;
    padding-top: 10px;
  }
  .cookie_all_btn {
    background: none;
    border: none;
  }
  .friendSelect_btn {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
  }
`;

const FriendSelectTitle = styled.p`
  font-size: 1.2rem;
  padding-bottom: 10px;
`;
const FriendSelectTip = styled.p`
  font-size: 0.8rem;
`;

const FriendSelectBtn = styled.button`
  width: 150px;
  height: 50px;
  border: 3px solid #7fa3ff;
  border-radius: 20px;
  background-color: #ffffff;
  font-family: "BRBA_B";
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
`;

const CookieListBox = styled.div`
  width: 90%;
  margin-left: 5%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(2, 150px);
  .cookie_img {
    width: 90%;
  }
  // @media (min-width: 1000px) {
  //   width: 100%;
  //   display: grid;
  //   grid-template-columns: repeat(3, 90px);
  //   grid-template-rows: repeat(2, 150px);

  // }
  // @media (max-width: 500px) {
  //   width: 100%;
  //   display: grid;
  //   grid-template-columns: repeat(3, 110px);
  //   grid-template-rows: repeat(2, 150px);
  //   .cookie_list {
  //     width: 100%;
  //   }
  // }
`;
