import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loadingCookie from "../assets/loading_cookie.gif";
import { useRecoilState } from "recoil";
import { accessAtom, uuidAtom, roomAtom, nicknameAtom } from "../utils/atom";
import styled from "styled-components";

function KakaoLogin() {
  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get("code");
  const [accessToken, setAccessToken] = useRecoilState(accessAtom);
  const [uuid, setUuid] = useRecoilState(uuidAtom);
  const [currentroom, setCurrentroom] = useRecoilState(roomAtom);
  const [nickname, setNickname] = useRecoilState(nicknameAtom);

  const kakaoLoginCode = async () => {
    try {
      await axios.post(`/api/auth/login`, { code }).then((result) => {
        const { status, data } = result;
        if (status === 200) {
          setAccessToken(data.tokens.access);
          setNickname(data.user.nickname);
          setUuid(data.user.uuid.split("-").join(""));
          setCurrentroom(data.user.uuid.split("-").join(""));
          navigate("/mymessage");
        } else if (status === 201 || status === 206) {
          navigate("/nickname", { state: { user_uuid: data.user_uuid } });
        } else {
          navigate("/");
        }
      });
    } catch (error) {}
  };
  useEffect(() => {
    kakaoLoginCode();
  }, []);

  return (
    <></>
    // <KakaoLoading>
    //   <img src={loadingCookie} alt="loading" width={300} />
    // </KakaoLoading>
  );
}

export default KakaoLogin;

const KakaoLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
