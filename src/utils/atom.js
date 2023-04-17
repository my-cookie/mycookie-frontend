import { atom, selector } from "recoil";

import { privateAxios } from "../hooks/useAxios";

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

// export const senderIconAtom = atom({
//   key: "senderIconAtom",
//   default: ""
// });

export const postSenderIconAtom = atom({
  key: "postSenderIconAtom",
  default: ""
});

export const postReceiverIconAtom = atom({
  key: "postReceiverIconAtom",
  default: ""
});

// 받은 쿠키
export const getReceiverSelector = selector({
  key: "get/receiverSelector",
  get: async () => {
    try {
      const res = await privateAxios.get(`api/msg/receiver`);
      console.log(res.data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
});

// 보낸 쿠키
export const getSenderSelector = selector({
  key: "get/SenderSelector",
  get: async () => {
    try {
      const res = await privateAxios.get(`api/msg/sender`);
      console.log(res.data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
});
