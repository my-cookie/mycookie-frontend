import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import styled from "styled-components";
import useAxios from "../hooks/useAxios";

function PrivateLayout() {
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();
  const [init, setInit] = useState(false);
  const privateAxios = useAxios();

  useEffect(() => {
    setInit(true);
    if (!accessToken && init) {
      console.log("access token 재발급");
      privateAxios
        .post("api/auth/access", {})
        .then((response) => {
          setAccessToken(response.data.access);
          console.log("재요청");
        })
        .catch((err) => {
          console.log(err);
          return navigate("/");
        });
    }
  }, [accessToken]);

  return (
    <MainLayout>
      <div className="contents_container">
        <Outlet />
      </div>
    </MainLayout>
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
