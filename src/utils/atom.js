import { atom, selector } from "recoil";
import axios from "axios";

export const uuidAtom = atom({
  key: "uuidAtom",
  default: null,
});

export const roomAtom = atom({
  key: "roomAtom",
  default: null,
});

export const sendingAtom = atom({
  key: "sendingAtom",
  default: false,
});

export const readingAtom = atom({
  key: "readingAtom",
  default: false,
});

export const sendmsgAtom = atom({
  key: "sendmsgAtom",
  default: null,
});

export const accessAtom = atom({
  key: "accessAtom",
  default: null,
});

export const nicknameAtom = atom({
  key: "nicknameAtom",
  default: null,
});

export const remainAtom = atom({
  key: "remainAtom",
  default: "",
});

export const receiverAtom = atom({
  key: "receiverAtom",
  default: "",
});

export const senderAtom = atom({
  key: "senderAtom",
  default: "",
});

export const contentAtom = atom({
  key: "contentAtom",
  default: "",
});

export const anonymousAtom = atom({
  key: "anonymousAtom",
  default: false,
});

export const iconAtom = atom({
  key: "iconAtom",
  default: "",
});

export const postSenderIconAtom = atom({
  key: "postSenderIconAtom",
  default: "",
});

export const postReceiverIconAtom = atom({
  key: "postReceiverIconAtom",
  default: "",
});

export const tabIndexAtom = atom({
  key: "tabIndexAtom",
  default: [0, 0],
});

export const receiveMessageAtom = atom({
  key: "receiveMessageAtom",
  default: [],
});

export const sendMessageAtom = atom({
  key: "sendMessageAtom",
  default: [],
});

export const currentUserAtom = atom({
  key: "currentUserAtom",
  default: null,
});

export const currentUserNicknameAtom = atom({
  key: "currentUserNicknameAtom",
  default: [],
});

export const privateAxios = selector({
  key: "privateAxios",
  get: async ({ get }) => {
    const accessToken = get(accessAtom);
    const privateAxios = axios.create({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    privateAxios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        console.log("실행");
        if (error.response?.status == 401) {
          const originalRequest = error.config;
          axios.post(`/api/auth/access`, {}).then((response) => {
            // setAccessToken(response.data.access);
            axios.headers.common.Authorization = `Bearer ${response.data.access}`;
            originalRequest.headers.common.Authorization = `Bearer ${response.data.access}`;
          });
          return axios(originalRequest);
        }
        // return Promise.reject(error);
      }
    );
    return privateAxios;

    // 중단된 요청 (에러난 요청)을 새로운 토큰으로 재전송
  },
});
