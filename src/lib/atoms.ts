import { atom } from "jotai";

export const userAtom = atom<{ username: string; email: string }>();
