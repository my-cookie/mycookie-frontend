import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { privateAxios } from "../utils/atom";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const selectOptions = [
  { value: "E", label: "오류" },
  { value: "U", label: "불편사항" },
  { value: "R", label: "건의사항" },
  { value: "C", label: "칭찬" }
];
function Feedback() {
  const axiosInstance = useRecoilValue(privateAxios);
  const [content, setContent] = useState("");
  const [selectedValue, setSelectedValue] = useState(selectOptions[0]);
  const navigate = useNavigate();

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  console.log(selectedValue.value);
  const feedbackHandler = () => {
    axiosInstance
      .post(`api/feedback/item`, {
        title: selectedValue.value,
        content: content
      })
      .then((res) => {
        console.log(res.data);
        alert("접수 완료!🤗");
        navigate("/mypage");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <FeedbackContainer>
      <div className="contents_container">
        <div className="feedback">문의하기</div>
        <div className="select_box">
          <StyledSelect
            className="selectItem"
            onChange={setSelectedValue}
            options={selectOptions}
            defaultValue={selectOptions[0]}
          />
        </div>

        <div className="feedback_content">
          <div className="message_background">
            <ContentInput
              placeholder="문의할 내용을 작성해줘!"
              onChange={changeContent}
            />
          </div>
        </div>
        <div className="feedback_btn">
          <FeedbackBtn onClick={feedbackHandler}>전송!</FeedbackBtn>
        </div>
      </div>
    </FeedbackContainer>
  );
}

export default Feedback;

const FeedbackContainer = styled.div`
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
  .select_box {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 10%;
  }

  .feedback {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    font-size: 1.4rem;
    align-items: center;
  }

  .message_background {
    width: 90%;
    height: 350px;
    padding: 20px;
    border-radius: 40px;
    border: 1px solid #a7a7a7;
    background-color: #f8f8f8;
  }

  .feedback_title {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .feedback_content {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .feedback_btn {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
  }
`;

const ContentInput = styled.textarea`
  width: 95%;
  height: 90%;
  background: none;
  outline: none;
  border: none;
  padding: 10px;
  font-family: "BRBA_B";
  font-size: 1rem;
  resize: none;
  line-height: 25px;
  align-items: center;
`;

const FeedbackBtn = styled.button`
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

const StyledSelect = styled(Select)`
  width: 120px;
  height: 30px;
`;
