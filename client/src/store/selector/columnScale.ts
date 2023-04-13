import * as d3 from 'd3';
import { selector } from 'recoil';

import { dataframeAtom } from '@/store/atom/dataframe';

type ColumnScale = d3.ScaleLinear<number, number, never> | null;

export const columnScaleSelector = selector<ColumnScale[]>({
  key: 'columnScale',
  get: ({ get }) => {
    const { data } = get(dataframeAtom);

    const initialMaxArray = Array.from({ length: data[0]?.length ?? 0 }).fill(
      0,
    ) as number[];

    const maxArray = data.reduce((prev: number[], cur: string[]) => {
      cur.forEach((v, idx) => {
        const value = Number(v);

        if (Number.isNaN(value)) {
          prev[idx] = -1;
        } else if (prev[idx] < value) {
          prev[idx] = value;
        }
      });

      return prev;
    }, initialMaxArray);

    const scale = maxArray.map((value) =>
      value === -1 ? null : d3.scaleLinear().domain([0, value]),
    );

    return scale;
  },
});
