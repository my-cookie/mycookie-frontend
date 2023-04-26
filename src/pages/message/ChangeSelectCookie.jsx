import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { anonymousAtom, contentAtom, privateAxios, receiverAtom } from "../../utils/atom";
import axios from "axios";

function ChangeSelectCookie() {
  const navigate = useNavigate();
  const receiver = useRecoilValue(receiverAtom);
  const content = useRecoilValue(contentAtom);
  const is_anonymous = useRecoilValue(anonymousAtom);

  const [cookie, setCookie] = useState([]);
  const [flavor, setFlavors] = useState([]);
  const axiosInstance = useRecoilValue(privateAxios);

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
    if (flavor.length === 1) {
      setFlavors(flavor.replace(`${e.target.id}`, ""));
    } else if (flavor.indexOf(e.target.id.toString()) === 0) {
      setFlavors(flavor.replace(`${e.target.id},`, ""));
    } else if (flavor.includes(`,${e.target.id}`)) {
      setFlavors(flavor.replace(`,${e.target.id}`, ""));
    } else {
      setFlavors(flavor.replace(`${e.target.id}`, ""));
    }
  };

  const selectBtn = () => {
    if (flavor.length === 0) {
      alert("1개 이상은 선택해야해! ");
    }
    axiosInstance
      .post(`/api/auth/myflavor/edit`, {
        flavor: flavor,
      })
      .then((result) => {
        const { status } = result;
        if (status === 201) {
          alert("쿠키맛 변경 완료!");
          navigate("/mypage");
        }
      })
      .catch((error) => {
        if (error.response.status === 406) {
          alert(`오늘은 쿠키맛 변경을 할 수 없어😣\n변경 가능일 : ${error.response.data.message}`);
        }
      });
  };

  return (
    <FriendSelectBox>
      <div className="contents_container">
        <div className="friend_select_title">
          <FriendSelectTitle>바꾸고 싶은</FriendSelectTitle>
          <FriendSelectTitle>쿠키맛을 골라봐!</FriendSelectTitle>

          <FriendSelectTip>tip. 쿠키는 일주일에 한 번만 변경할 수 있어!</FriendSelectTip>
        </div>

        <div className="select_cookie">
          <div className="select_cookie_back">
            <CookieListBox>
              {cookie &&
                cookie?.map((cookie) => {
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
        <div className="friendSelect_btn">
          <FriendSelectBtn type="button" onClick={selectBtn}>
            선택완료!
          </FriendSelectBtn>
        </div>
      </div>
    </FriendSelectBox>
  );
}

export default ChangeSelectCookie;

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
    margin: 5px;
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
  font-size: 1.4rem;
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

const CookieListBox = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 150px);
  grid-template-rows: repeat(2, 150px);
  @media (min-width: 1000px) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 90px);
    grid-template-rows: repeat(2, 150px);
    .cookie_img {
      width: 80px;
    }
  }
  @media (max-width: 500px) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 110px);
    grid-template-rows: repeat(2, 150px);
    .cookie_list {
      width: 100%;
    }
  }
`;
