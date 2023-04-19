import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { privateAxios, receiverAtom, senderAtom } from "../../utils/atom";

function SearchCookie() {
  const [search, setSearch] = useState([]); // 검색 데이터 저장
  const [searchField, setSearchField] = useState(""); // 검색창 onchange
  const [bookmark, setBookmark] = useState([]); // 북마크 get
  const [bookmarkId, setBookmarkId] = useState([]); // 북마크 target_id
  const [receiver, setReceiver] = useRecoilState(receiverAtom); // 받은 쿠키
  const [senderName, setSenderName] = useRecoilState(senderAtom); // 보낸 쿠키
  const navigate = useNavigate();
  const axiosInstance = useRecoilValue(privateAxios);

  useEffect(() => {
    if (searchField !== 0) {
      axiosInstance
        .post(`api/auth/search`, { nickname: searchField })
        .then((res) => {
          setSearch(res.data);
        });
    }
  }, [searchField]);

  const searchNickname = (e) => {
    setSearchField(e.target.value);
  };

  // 북마크 데이터 get
  useEffect(() => {
    axiosInstance.get(`api/bookmark/item`).then((res) => {
      setBookmark(res.data);
      // res.data.map((el) => setBookmarkId([...bookmarkId, el.target.id]));
    });
  }, []);

  // 현재 북마크 되어 있는 유저
  useEffect(() => {
    console.log(bookmark);
  }, [bookmark]);

  // 즐겨찾기 추가
  const favoriteAddHandler = (e) => {
    console.log(e.target.id);
    axiosInstance
      .post(`api/bookmark/item`, { target: e.target.id })
      .then((result) => {
        const { status, res } = result;
        // setBookmarkId(e.target.id);
        if (status === 201) {
          setBookmarkId([e.target.id, ...bookmarkId]);
          setBookmark([res.data, ...bookmark]);
        } else if (status === 206) {
          alert("이미 즐겨찾기에 등록되어 있어!");
        } else if (status === 400) {
          alert("뭔가 잘못되었어..!😳");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(bookmarkId);
  console.log(bookmark);

  // 즐겨찾기 삭제
  const favoriteDeleteHandler = (e) => {
    console.log(e.target.id);
    axiosInstance
      .delete(`api/bookmark/item`, { target: e.target.id })
      .then((result) => {
        const { status } = result;
        if (status === 200) {
          setBookmarkId(
            bookmarkId.filter((el) => {
              return el !== e.target.id;
            })
          );
          setBookmark(
            bookmark.filter((el) => {
              return el.target.id !== e.target.id;
            })
          );
        } else if (status === 400) {
          alert("뭔가 잘못되었어..!😳");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 받는 사람
  useEffect(() => {
    console.log(receiver);
  }, [receiver]);

  // 북마크 된 유저 클릭 시
  const sendHandler = (e) => {
    console.log(e.target.id);
    let receiverNickname = bookmark.filter((el) => {
      return el.target.id == e.target.id;
    });
    console.log(receiverNickname); // 현재 클릭한 유저를 북마크 된 리스트에서 찾아냄
    setReceiver({
      id: e.target.id,
      nickname: receiverNickname[0].target.nickname
    });

    axiosInstance
      .post(`api/msg/remain`, { receiver: e.target.id })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.sender_nickname);
        setSenderName(res.data.sender_nickname);
        if (res.data.count == 0) {
          alert("오늘 친구에게 보낼 메세지를 다 사용했어😫");
        } else {
          alert("친구에게 보낼 잔여 메세지가 " + res.data.count + "개 남았어!");
        }
      });
  };

  // 쿠키 보내기 버튼
  const submitBtn = () => {
    if (!receiver.nickname) {
      alert("친구를 선택해야 해!🥸");
    } else {
      navigate("/sendmessage");
    }
  };

  console.log(search);
  // 쿠키 찾기
  const searchSelect = (e) => {
    console.log(e.target.id);
    let toReceiver = search.filter((el) => {
      return el.target.id == e.target.id;
    });
    console.log(toReceiver);
    setReceiver({
      id: e.target.id,
      nickname: toReceiver[0].target.nickname
    });

    axiosInstance
      .post(`api/msg/remain`, { receiver: e.target.id })
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
            onChange={searchNickname}
            value={searchField}
          />
        </div>
        {!bookmark.length && !searchField.length ? (
          <p className="no_search">등록된 즐겨찾기가 없네^^..</p>
        ) : (
          ""
        )}
        {searchField.length !== 0 ? (
          <div className="search_box">
            {search.length !== 0
              ? search.map((search) => {
                  return (
                    <div
                      key={search.id}
                      id={search.id}
                      className="box_list"
                      onClick={searchSelect}
                    >
                      {search.nickname}

                      {bookmarkId.includes(`${search.id}`) ? (
                        <button
                          key={search.id}
                          id={search.id}
                          onClick={favoriteDeleteHandler}
                          className="star_btn"
                        >
                          ★
                        </button>
                      ) : (
                        <button
                          key={search.id}
                          id={search.id}
                          onClick={favoriteAddHandler}
                          className="star_btn"
                        >
                          ☆
                        </button>
                      )}
                    </div>
                  );
                })
              : "검색결과가 없습니다"}
          </div>
        ) : (
          <div>
            {bookmark.map((bookmark) => {
              return (
                <div
                  key={bookmark.target.id}
                  id={bookmark.target.id}
                  className="bookmark_BG"
                  onClick={sendHandler}
                >
                  <div
                    className="btn_BG"
                    id={bookmark.target.id}
                    key={bookmark.target.id}
                  >
                    <li id={bookmark.target.id} className="box_list">
                      {bookmark.target.nickname}
                    </li>
                    <button
                      key={bookmark.target.id}
                      id={bookmark.target.id}
                      onClick={favoriteDeleteHandler}
                      className="star_btn"
                    >
                      ★
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="search_send">
          {receiver.nickname ? (
            <SearchSend>
              <p className="strong">'{receiver.nickname}'</p>
              <p> 에게 보낼까?</p>
            </SearchSend>
          ) : (
            <SearchSend>누구에게 쿠키를 보낼까?</SearchSend>
          )}
        </div>
        <div className="search_btn">
          <SearchBtn type="submit" onClick={submitBtn}>
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
  }
  .search_box {
    width: 80%;
    height: 15%;
    background-color: #fff;
    padding: 20px;
    align-items: center;
    margin: 10px auto;
    border-radius: 20px;
    font-size: 1.2rem;
    list-style: none;
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
    padding: 5px;
  }

  .btn_BG {
    width: 95%;
    height: 60%;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    /* overflow-y: scroll; */
    display: flex;
    justify-content: space-between;
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
`;
