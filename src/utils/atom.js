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

export const receiveMsgStatusAtom = atom({
  key: "receiveMsgStatusAtom",
  default: false,
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
    return privateAxios;
  },
});
