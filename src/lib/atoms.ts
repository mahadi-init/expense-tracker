import { atom } from "jotai";

export const userAtom =
  atom<Partial<{ id: string; name: string | null; email: string | null }>>();
