import { atom } from 'recoil';

export const columnOrderAtom = atom<number[]>({
  key: 'columnOrder',
  default: [],
});
