import { atom } from 'recoil';

export const columnVisibilityAtom = atom<boolean[]>({
  key: 'columnVisibility',
  default: [],
});
