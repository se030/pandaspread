import { useTheme } from '@emotion/react';
import * as d3 from 'd3';
import { selector } from 'recoil';

import { dataframeAtom } from '@/store/atom/dataframe';

type ColumnScale = {
  range: d3.ScaleLinear<number, number, never>;
  color: d3.ScaleSequential<string, never>;
} | null;

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

    const { color } = useTheme();
    const { primary, primaryDark } = color;

    const scale = maxArray.map((value) => {
      if (value === -1) return null;

      const range = d3.scaleLinear().domain([0, value]);
      const color = d3
        .scaleSequential(d3.interpolate(primary, primaryDark))
        .domain([0, value]);

      return { range, color };
    });

    return scale;
  },
});
