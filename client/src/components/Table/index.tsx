import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Td from './Td';
import Thead from './Thead';

import { ROW } from '@/constants/table-row';
import { useVirtualScroll } from '@/hooks/useVirtualScroll';
import { columnOrderAtom } from '@/store/atom/columnOrder';
import { columnViewAtom } from '@/store/atom/columnView';
import { columnVisibilityAtom } from '@/store/atom/coulmnVisibility';
import { dataframeAtom } from '@/store/atom/dataframe';
import {
  type ColumnScale,
  columnScaleSelector,
} from '@/store/selector/columnScale';
import { color } from '@/styles/theme';

const Table = () => {
  const [{ data }] = useRecoilState(dataframeAtom);

  const { start, offset, style: scrollStyle } = useVirtualScroll(data.length);

  const [columnVisibility, setColumnVisibility] =
    useRecoilState(columnVisibilityAtom);
  const [columnView, setColumnView] = useRecoilState(columnViewAtom);

  useEffect(() => {
    const initialState = Array.from({ length: columns.length }).fill(
      true,
    ) as boolean[];

    setColumnVisibility(initialState);
    setColumnView(initialState);
  }, []);

  const columnScale = useRecoilValue(columnScaleSelector);
  const [columnOrder] = useRecoilState(columnOrderAtom);

  const [{ columns }] = useRecoilState(dataframeAtom);

  const gridTemplateColumns = calcTableLayout(
    columnOrder,
    columnScale,
    columnVisibility,
    columnView,
  );

  return (
    <table css={style.table(gridTemplateColumns)}>
      <Thead />
      <tbody css={style.tbody(data.length)}>
        {data.slice(start, start + offset).map((row, index) => (
          <tr key={index} css={scrollStyle(start + index)}>
            <td>{start + index}</td>
            {columnOrder.map((idx, i) => {
              const value = row[idx];

              return (
                <Td
                  key={`${idx}-${value}-${columnVisibility?.[idx]}-${i}`}
                  {...{ idx, value, hidden: !columnVisibility?.[idx] }}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

const style = {
  table: (gridTemplateColumns: string) =>
    css({
      width: '100%',
      height: '100%',
      borderCollapse: 'collapse',

      tr: {
        display: 'grid',
        gridTemplateColumns,
        gap: '1rem',

        '& > *:nth-of-type(1)': {
          width: indexColumnWidth,
        },

        '&:hover': {
          text: {
            fill: color.black,

            '&.contrast': {
              fill: color.offwhite,
            },
          },
        },
      },
    }),

  tbody: (rows: number) =>
    css({
      position: 'relative',
      height: ROW.HEIGHT * rows,

      tr: {
        borderBottom: '1px solid #e2e2e2',
        '&:nth-last-of-type(1)': {
          borderBottom: 'none',
        },
      },

      td: {
        padding: '1rem',
        textAlign: 'center',
        whiteSpace: 'nowrap',
      },
    }),
};

const calcTableLayout = (
  columnOrder: number[],
  columnScale: ColumnScale[],
  columnVisibility?: boolean[],
  columnView?: boolean[],
) => {
  if (!columnVisibility || !columnView) return 'auto';

  return columnOrder.reduce((prev: string, idx) => {
    return (
      prev +
      // eslint-disable-next-line no-nested-ternary
      (columnVisibility[idx] && columnView[idx] && columnScale[idx]
        ? '300px '
        : columnVisibility[idx]
        ? '120px '
        : '')
    );
  }, `${indexColumnWidth} `);
};

const indexColumnWidth = '60px';
