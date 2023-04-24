import { atom, selector } from "recoil";
import axios from "axios";

export const uuidAtom = atom({
  key: "uuidAtom",
  default: null
});

export const roomAtom = atom({
  key: "roomAtom",
  default: null
});

export const sendingAtom = atom({
  key: "sendingAtom",
  default: false
});

export const sendmsgAtom = atom({
  key: "sendmsgAtom",
  default: null
});

export const accessAtom = atom({
  key: "accessAtom",
  default: null,
  // effects_UNSTABLE: [persistAtom],
  default: null
  // effects_UNSTABLE: [persistAtom]
});

export const remainAtom = atom({
  key: "remainAtom",
  default: ""
});

export const receiverAtom = atom({
  key: "receiverAtom",
  default: ""
});

export const senderAtom = atom({
  key: "senderAtom",
  default: ""
});

export const contentAtom = atom({
  key: "contentAtom",
  default: ""
});

export const anonymousAtom = atom({
  key: "anonymousAtom",
  default: false
});

export const iconAtom = atom({
  key: "iconAtom",
  default: ""
});

export const postSenderIconAtom = atom({
  key: "postSenderIconAtom",
  default: ""
});

export const postReceiverIconAtom = atom({
  key: "postReceiverIconAtom",
  default: ""
});

export const privateAxios = selector({
  key: "privateAxios",
  get: async ({ get }) => {
    const accessToken = get(accessAtom);
    const privateAxios = axios.create({
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return privateAxios;
  }
});

// 받은 쿠키
export const getReceiverSelector = selector({
  key: "get/receiverSelector",
  get: async ({ get }) => {
    const PrivateAxios = get(privateAxios);
    try {
      const res = await PrivateAxios.get(`api/msg/receiver`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
});

// 보낸 쿠키
export const getSenderSelector = selector({
  key: "get/SenderSelector",
  get: async ({ get }) => {
    const PrivateAxios = get(privateAxios);
    try {
      const res = await PrivateAxios.get(`api/msg/sender`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
});
