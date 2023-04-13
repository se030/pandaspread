import { atom } from 'recoil';

export const columnViewAtom = atom<boolean[]>({
  key: 'columnView',
  default: [],
});
