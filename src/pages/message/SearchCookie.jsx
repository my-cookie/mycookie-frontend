import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  privateAxios,
  receiverAtom,
  remainAtom,
  senderAtom
} from "../../utils/atom";
import { useNavigate } from "react-router-dom";

function SearchCookie() {
  const axiosInstance = useRecoilValue(privateAxios);
  const [nickname, setNickname] = useState(""); // 검색시 입력되는 닉네임
  const [search, setSearch] = useState([]); // 검색 api 데이터 저장
  const [bookmark, setBookmark] = useState([]); // 북마크 api 데이터
  const [bookmarkId, setBookmarkId] = useState([]); // 내가 한 북마크
  const [receiver, setReceiver] = useRecoilState(receiverAtom); // 받은 쿠키
  const [senderName, setSenderName] = useRecoilState(senderAtom); // 보낸 쿠키
  const [remain, setRemain] = useRecoilState(remainAtom);
  const navigate = useNavigate();
  const [clicked, unClicked] = useState(false);

  // 검색창에 입력되는 닉네임
  const inputNickname = (e) => {
    setNickname(e.target.value);
  };

  // 검색에 입력된 닉네임을 post 서버에서 찾음
  useEffect(() => {
    if (nickname !== 0) {
      axiosInstance
        .post(`api/auth/search`, { nickname: nickname })
        .then((res) => {
          console.log("닉네임post", res.data);
          setSearch(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [nickname]);

  // 서버에 저장된 북마크 get
  const handleGetBookmark = useCallback(() => {
    axiosInstance.get(`api/bookmark/item`).then((res) => {
      console.log(res.data);
      setBookmark(res.data);
    });
  }, []);

  useEffect(() => {
    handleGetBookmark();
  }, [handleGetBookmark]);

  // 북마크 함
  const AddBookmarkHandler = (e) => {
    axiosInstance
      .post(`api/bookmark/item`, { target: parseInt(e.target.id) })
      .then((result) => {
        const { status } = result;
        if (status === 201) {
          console.log(status);
          setNickname(""); // 작동안함
          setBookmarkId(parseInt(e.target.id));
          unClicked(true);
          handleGetBookmark();
        } else if (status === 206) {
          alert("이미 추가된 쿠키야!😉");
        } else if (status === 400) {
          alert("자기 자신은 추가할 수 없어!");
        }
      })
      .catch((err) => console.log(err));
  };

  // 북마크 해제
  const DeleteBookmarkHandler = (e) => {
    console.log(typeof e.target.id);
    axiosInstance
      .delete(`api/bookmark/item`, { data: { target: parseInt(e.target.id) } })
      .then((result) => {
        const { status } = result;
        if (status === 200) {
          handleGetBookmark();
          unClicked(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 좋아! 버튼
  const cookieSubmitBtn = () => {
    if (!receiver.nickname) {
      alert("친구를 선택해야 해!🥸");
    } else {
      navigate("/sendmessage");
    }
  };

  // 북마크 되어 있는 유저 div 클릭시
  const sendHandler = (e) => {
    console.log(e.target.id);
    let receiverNickname = bookmark.filter((el) => {
      return el.target.id == e.target.id;
    });
    setReceiver({
      id: e.target.id,
      nickname: receiverNickname[0].target.nickname
    });
    setRemain(e.target.id);

    axiosInstance
      .post(`api/msg/remain`, { receiver: parseInt(e.target.id) })
      .then((res) => {
        console.log(res.data);
        setSenderName(res.data.sender_nickname);
        if (res.data.count == 0) {
          alert("오늘 친구에게 보낼 메세지를 다 사용했어😫");
        } else {
          alert("친구에게 보낼 잔여 메세지가 " + res.data.count + "개 남았어!");
        }
      });
  };

  console.log(receiver);
  console.log(remain);

  // 쿠키 검색할 때 div 클릭 시
  const searchSelect = (e) => {
    setNickname(""); // 작동안함
    let toReceiver = search.filter((el) => {
      return el.id == e.target.id;
    });
    console.log(toReceiver);
    setReceiver({
      id: e.target.id,
      nickname: toReceiver[0].nickname
    });
    setRemain(e.target.id);

    axiosInstance
      .post(`api/msg/remain`, { receiver: parseInt(e.target.id) })
      .then((res) => {
        setSenderName(res.data.sender_nickname);
        if (res.data.count == 0) {
          alert("오늘 친구에게 보낼 메세지를 다 사용했어😫");
        } else {
          alert("친구에게 보낼 잔여 메세지가 " + res.data.count + "개 남았어!");
        }
      });
  };

  return (
    <SearchCookieBox>
      <div className="contents_container">
        <div className="search_title">
          <SearchTitle>쿠키 찾기</SearchTitle>
        </div>
        <div className="search_input">
          <SearchInput
            type="text"
            placeholder="친구를 찾아봐!"
            maxlength="7"
            onChange={inputNickname}
          />
        </div>
        {nickname.length > 0 ? (
          <div className="search_box">
            {search
              ? search.map((search) => {
                  return (
                    <SearchDiv
                      id={search.id}
                      key={search.id}
                      onClick={searchSelect}
                    >
                      <SearchUl id={search.id} key={search.id}>
                        <SearchList id={search.id} key={search.id}>
                          {search.nickname}
                        </SearchList>
                        {clicked ? (
                          <button id={search.id} className="star_btn">
                            ★
                          </button>
                        ) : (
                          <button
                            id={search.id}
                            className="star_btn"
                            onClick={AddBookmarkHandler}
                          >
                            ☆
                          </button>
                        )}
                      </SearchUl>
                    </SearchDiv>
                  );
                })
              : ""}
          </div>
        ) : (
          ""
        )}
        <div>
          <div className="bookmark_BG">
            {bookmark
              ? bookmark.map((bookmark) => {
                  return (
                    <div
                      className="btn_BG"
                      key={bookmark.target.id}
                      id={bookmark.target.id}
                      onClick={sendHandler}
                    >
                      <BookmarkUl
                        id={bookmark.target.id}
                        key={bookmark.target.id}
                      >
                        <li
                          className="box_list"
                          id={bookmark.target.id}
                          key={bookmark.target.id}
                        >
                          {bookmark.target.nickname}
                        </li>
                        <button
                          id={bookmark.target.id}
                          className="star_btn"
                          onClick={DeleteBookmarkHandler}
                        >
                          ★
                        </button>
                      </BookmarkUl>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>

        <div className="search_send">
          {clicked ? (
            <SearchSend>
              <p className="strong">'{receiver.nickname}'</p>
              <p> 에게 보낼까?</p>
            </SearchSend>
          ) : (
            <SearchSend>누구에게 쿠키를 보낼까?</SearchSend>
          )}
        </div>
        <div className="search_btn">
          <SearchBtn type="submit" onClick={cookieSubmitBtn}>
            좋아!
          </SearchBtn>
        </div>
      </div>
    </SearchCookieBox>
  );
}

export default SearchCookie;

const SearchCookieBox = styled.div`
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
  .search_title {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    padding-top: 10px;
  }
  .search_input {
    width: 100%;
    height: 15%;
  }
  .search_send {
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .box_list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 0 10px;
  }
  .search_box {
    width: 100%;
    height: 15%;
    background-color: #fff;
    align-items: center;
    border-radius: 20px;
    font-size: 1rem;
    list-style: none;
    margin-bottom: 10px;
    display: flex;
    @media (min-width: 390px) {
      height: 10%;
    }

    /* overflow-y: scroll; */
  }
  .search_btn {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
  }

  .star_btn {
    background: none;
    border: none;
    color: #7fa3ff;
    font-size: 1.3rem;
    font-weight: 700;
    padding: 0 10px 0 10px;
  }

  .btn_BG {
    width: 95%;
    height: 60%;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    @media (min-width: 390px) {
      width: 93%;
    }
  }

  .no_search {
    padding: 10px;
  }

  .bookmark_BG {
    margin-bottom: 10px;
  }

  .strong {
    font-size: 1.2rem;
    color: #ff7f8c;
  }
`;

const SearchTitle = styled.div`
  font-size: 1.4rem;
  padding-top: 20px;
`;

const SearchInput = styled.input`
  border: 1px solid black;
  border-radius: 10px;
  width: 100%;
  height: 50px;
  margin-top: 30px;
  outline: none;
  font-size: 1.2rem;
  font-family: "BRBA_B";
  box-sizing: border-box;
  padding-left: 10px;
`;

const SearchSend = styled.div`
  font-family: "BRBA_B";
  font-size: 1.2rem;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchBtn = styled.button`
  width: 150px;
  height: 50px;
  border: 3px solid #7fa3ff;
  border-radius: 20px;
  background-color: #ffffff;
  font-family: "BRBA_B";
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  a {
    text-decoration: none;
    color: black;
  }
`;

const BookmarkUl = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const SearchDiv = styled.div`
  width: 100%;
`;
const SearchUl = styled.ul`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 10px 0 10px;
`;
const SearchList = styled.li`
  box-sizing: border-box;
  padding: 10px;
`;
