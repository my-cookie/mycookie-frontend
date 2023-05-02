import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { accessAtom, nicknameAtom, uuidAtom, roomAtom } from "../../utils/atom";
import axios from "axios";
import toast from "react-hot-toast";

function SelectCookie() {
  const navigate = useNavigate();
  const [cookie, setCookie] = useState([]); // 서버에서 불러오는 쿠키
  const [flavor, setFlavors] = useState(""); // 유저가 선택한 쿠키
  const location = useLocation();
  const [accessToken, setAccessToken] = useRecoilState(accessAtom);
  const [uuid, setUuid] = useRecoilState(uuidAtom);
  const [currentroom, setCurrentroom] = useRecoilState(roomAtom);
  const [nickname, setNickname] = useRecoilState(nicknameAtom);

  const notify = (message) =>
    toast(`${message}`, {
      icon: "🍪",
    });

  useEffect(() => {
    try {
      setUuid(location.state.user_uuid);
      setNickname(location.state.nickname);
    } catch {
      navigate("/");
    }
  }, []);

  async function getCookie() {
    try {
      const res = await axios.get(`api/flavor/cookies`);
      setCookie(res.data);
    } catch (error) {}
  }

  useEffect(() => {
    getCookie();
  }, []);

  const handleClickPlus = (e) => {
    if (flavor.length === 0) {
      setFlavors(flavor + `${e.target.id}`);
    } else {
      setFlavors(flavor + `,${e.target.id}`);
    }
  };

  const handleClickMinus = (e) => {
    if (flavor.length == 1) {
      setFlavors(flavor.replace(`${e.target.id}`, ""));
    } else if (flavor.indexOf(e.target.id.toString()) == 0) {
      setFlavors(flavor.replace(`${e.target.id},`, ""));
    } else if (flavor.includes(`,${e.target.id}`)) {
      setFlavors(flavor.replace(`,${e.target.id}`, ""));
    } else {
      setFlavors(flavor.replace(`${e.target.id}`, ""));
    }
  };

  const selectBtn = () => {
    if (flavor.length === 0) {
      notify("1개 이상은 선택해야해 ~");
    }
    axios
      .post(`api/auth/info`, { nickname, flavor, user_uuid: uuid })
      .then((result) => {
        const { status, data } = result;

        if (status === 200) {
          setAccessToken(data.tokens.access);
          setNickname(data.user.nickname);
          setUuid(data.user.uuid.split("-").join(""));
          setCurrentroom(data.user.uuid.split("-").join(""));
          navigate("/mymessage");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {});
  };

  return (
    <SelectCookieBox>
      <div className="contents_container">
        <div className="select_title">
          <SelectTitle>너는 어떤 쿠키맛을 좋아해 ~ ?</SelectTitle>
          <SelectTip>tip. 모든 맛을 선택해도 괜찮아 !</SelectTip>
        </div>

        <div className="select_cookie">
          <div className="select_cookie_back">
            <CookieListBox>
              {cookie &&
                cookie?.map((cookie, index) => {
                  return flavor.includes(`${cookie.id}`) ? (
                    <button className="cookie_all_btn" onClick={handleClickMinus} id={cookie.id} key={cookie.id}>
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

  .select_title {
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
    // @media (max-width: 350px) {
    //   width: 100%;
    // }
    // @media (max-width: 370px) {
    //   width: 90%;
    // }
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
    // @media (max-width: 350px) {
    //   width: 100%;
    // }
    // @media (max-width: 370px) {
    //   width: 100%;
    // }
  }
  .cookie_all_btn {
    background: none;
    border: none;
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
  font-size: 0.8rem;
  padding-top: 10px;
`;

const CookieListBox = styled.ul`
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
  //   .cookie_img {
  //     width: 80px;
  //   }
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
  // @media (max-width: 350px) {
  //   width: 100%;
  //   display: grid;
  //   grid-template-columns: repeat(3, 80px);
  //   grid-template-rows: repeat(2, 150px);
  //   .cookie_list {
  //     width: 100%;
  //   }
  // }
  // @media (max-width: 370px) {
  //   width: 90%;
  //   display: grid;
  //   grid-template-columns: repeat(3, 80px);
  //   grid-template-rows: repeat(2, 150px);
  //   .cookie_list {
  //     width: 100%;
  //   }
  // }
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

const CookieSelectBtn = styled.input`
  width: 80px;
  height: 40px;
  border: 3px solid #7fa3ff;
  border-radius: 15px;
  background-color: #ffffff;
  font-family: "BRBA_B";
  font-size: 0.8rem;
  cursor: pointer;
  margin: 5px;
  &:active {
    background: orange;
  }
`;
