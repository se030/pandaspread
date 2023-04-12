import { atom } from 'recoil';

export const dataframeAtom = atom<Dataframe>({
  key: 'dataframe',
  default: {
    columns: [],
    index: [],
    data: [],
  },
});
