import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { axiosInstance } from "../../api/axios";

function SelectCookie() {
  const navigate = useNavigate();
  const [flavor, setFlavor] = useState();
  const user_uuid = "b22a8b3a-0f76-4859-a7d5-7238a36c0cf9";
  // useEffect(() => {
  //   axiosInstance.get(`api/flavor/cookies`).then((res) => {
  //     console.log(res.data);
  //     setCookies(res.data);
  //   });
  // }, []);

  const handleClick = (e) => {
    console.log(e.currentTarget.id);
    setFlavor(e.currentTarget.id);
  };

  const selectBtn = () => {
    const nicknameData = sessionStorage.getItem("nickname");
    const nickname = JSON.parse(nicknameData);
    axiosInstance
      .post(`api/auth/info`, { nickname, flavor, user_uuid })
      .then((res) => {
        console.log(res.data);
        navigate("/mymessage");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SelectCookieBox>
      <div className="contents_container">
        {/* <div className="next_icon">
          <FontAwesomeIcon
            icon={faAngleRight}
            rotation={180}
            style={{ color: "#000000" }}
          />
          <FontAwesomeIcon icon={faAngleRight} style={{ color: "#000000" }} />
        </div> */}

        <div className="select_title">
          <SelectTitle>너는 어떤 맛 쿠키야?</SelectTitle>
          <SelectTip>tip. 모든 맛을 전부 다 선택해도 괜찮아!</SelectTip>
        </div>

        <div className="select_cookie">
          <div className="select_cookie_back">
            {/* <ul>
              {cookies?.map((cookie) => {
                return <li key={cookie.id}>{cookie.img}</li>;
              })}
            </ul> */}
            <CookieLine>
              <Cookie>
                <CookieImg src="https://d4pwibjctaa5b.cloudfront.net/진짜진저맛.png" />
                <CookieBtn id="1" onClick={handleClick}>
                  진짜진저맛
                </CookieBtn>
              </Cookie>
              <Cookie>
                <CookieImg src="https://d4pwibjctaa5b.cloudfront.net/민트나무맛.png" />
                <CookieBtn id="2" onClick={handleClick}>
                  민트나무맛
                </CookieBtn>
              </Cookie>
              <Cookie>
                <CookieImg src="https://d4pwibjctaa5b.cloudfront.net/레몬파이맛.png" />
                <CookieBtn id="3" onClick={handleClick}>
                  레몬파이맛
                </CookieBtn>
              </Cookie>
            </CookieLine>

            <CookieLine>
              <Cookie>
                <CookieImg src="https://d4pwibjctaa5b.cloudfront.net/솔티슈가맛.png" />
                <CookieBtn id="4" onClick={handleClick}>
                  솔티슈가맛
                </CookieBtn>
              </Cookie>
              <Cookie>
                <CookieImg src="https://d4pwibjctaa5b.cloudfront.net/초코퐁당맛.png" />
                <CookieBtn id="5" onClick={handleClick}>
                  초코퐁당맛
                </CookieBtn>
              </Cookie>
              <Cookie>
                <CookieImg src="https://d4pwibjctaa5b.cloudfront.net/블루팡이맛.png" />
                <CookieBtn id="6" onClick={handleClick}>
                  블루팡이맛
                </CookieBtn>
              </Cookie>
            </CookieLine>
          </div>
        </div>
        <div className="select_btn">
          <SelectBtn type="button" onClick={selectBtn}>
            선택완료!
          </SelectBtn>
        </div>
      </div>
    </SelectCookieBox>
  );
}

export default SelectCookie;

const SelectCookieBox = styled.div`
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

  .next_icon {
    width: 100%;
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
  }

  .select_title {
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .select_cookie {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
  }

  .select_cookie_back {
    height: 300px;
    border-radius: 40px;
    border: 1px solid #a7a7a7;
    background-color: #f8f8f8;
    padding: 20px;
  }

  .select_btn {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
  }
`;

const SelectTitle = styled.p`
  font-size: 1.4rem;
`;
const SelectTip = styled.p`
  font-size: 0.6rem;
  padding-top: 10px;
`;

const Cookie = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-bottom: 30px;
`;

const CookieImg = styled.img`
  width: 80px;
`;
const CookieBtn = styled.button`
  width: 80px;
  height: 40px;
  border: 3px solid #7fa3ff;
  border-radius: 15px;
  background-color: #ffffff;
  font-family: "BRBA_B";
  font-size: 0.8rem;
  cursor: pointer;
  margin-top: 10px;
`;

const CookieLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const SelectBtn = styled.button`
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
