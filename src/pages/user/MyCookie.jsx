import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { privateAxios } from "../../utils/atom";
import toast from "react-hot-toast";

function SelectCookie() {
  const navigate = useNavigate();
  const [cookie, setCookie] = useState([]); // 서버에서 불러오는 쿠키
  const axiosInstance = useRecoilValue(privateAxios);

  async function getCookie() {
    try {
      axiosInstance.get(`api/auth/myflavor`).then((res) => {
        setCookie(res.data);
      });
    } catch (error) {}
  }

  const notify = (message) =>
    toast(`${message}`, {
      icon: "🍪",
    });

  useEffect(() => {
    getCookie();
  }, []);

  const changeFlavor = () => {
    axiosInstance
      .get(`api/auth/myflavor/edit`)
      .then((result) => {
        if (result.status == 200) {
          navigate("/changeselect");
        }
      })
      .catch((error) => {
        if (error.response.status == 406) {
          notify(`아직 쿠키맛 변경일로 부터 일주일이 지나지 않았어 ~\n변경가능일 : ${error.response.data.message}`);
        }
      });
  };

  return (
    <SelectCookieBox>
      <div className="contents_container">
        <div className="select_title">
          <SelectTitle>네가 좋아하는 쿠키맛은 이거양</SelectTitle>
          <SelectTip>tip. 쿠키 취향이 바뀌었다면 변경할 수 있어</SelectTip>
        </div>

        <div className="select_cookie">
          <div className="select_cookie_back">
            <CookieListBox>
              {cookie &&
                cookie?.map((cookie, index) => {
                  return (
                    <button className="cookie_all_btn" id={cookie.id} key={cookie.id}>
                      <li className="cookie_list" id={cookie.id}>
                        <img style={{ backgroundColor: "orange" }} src={cookie.img} alt={cookie.name} id={cookie.id} className="cookie_img" />
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
          <SelectBtn type="button" onClick={changeFlavor}>
            쿠키맛 변경
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
    height: 40%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .select_cookie {
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
  }

  .select_cookie_back {
    width: 100%;
    height: 250px;
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
    margin: 5px;
    text-align: center;
    align-items: center;
    padding-top: 10px;
  }
  .cookie_all_btn {
    background: none;
    border: none;
  }
  .select_btn {
    width: 100%;
    height: 40%;
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
