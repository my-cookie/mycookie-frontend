import { atom } from "recoil";

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
