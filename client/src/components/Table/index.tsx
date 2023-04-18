import { css } from '@emotion/react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Td from './Td';
import Thead from './Thead';

import { useColumnView } from '@/hooks/useColumnView';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import { useVirtualScroll } from '@/hooks/useVirtualScroll';
import { dataframeAtom } from '@/store/atom/dataframe';
import {
  type ColumnScale,
  columnScaleSelector,
} from '@/store/selector/columnScale';

const Table = () => {
  const [{ data, columns }] = useRecoilState(dataframeAtom);

  const { start, offset, style: scrollStyle } = useVirtualScroll(data.length);

  const { columnVisibility } = useColumnVisibility();
  const { columnView } = useColumnView();
  const columnScale = useRecoilValue(columnScaleSelector);

  const gridTemplateColumns = calcTableLayout(
    columns.length,
    columnScale,
    columnVisibility,
    columnView,
  );

  return (
    <table css={style.table(gridTemplateColumns)}>
      <Thead />
      <tbody css={style.tbody}>
        <tr css={scrollStyle.dummy(start)}></tr>
        {data.slice(start, start + offset).map((row, index) => (
          <tr key={index}>
            <td>{start + index}</td>
            {row.map((value, idx) => (
              <Td
                key={`${idx}-${value}-${columnVisibility?.[idx]}`}
                {...{ idx, value, hidden: !columnVisibility?.[idx] }}
              />
            ))}
          </tr>
        ))}
        <tr css={scrollStyle.dummy(data.length - (start + offset))}></tr>
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
          width: '60px', // Index column
        },
      },
    }),

  tbody: css({
    tr: {
      borderBottom: '1px solid #e2e2e2',
      '&:nth-last-of-type(1)': {
        borderBottom: 'none',
      },
    },
    td: {
      padding: '1rem',
      textAlign: 'start',
      whiteSpace: 'nowrap',
    },
  }),
};

const calcTableLayout = (
  length: number,
  columnScale: ColumnScale[],
  columnVisibility?: boolean[],
  columnView?: boolean[],
) => {
  if (!columnVisibility || !columnView) return 'auto';

  return Array.from({ length }).reduce((prev: string, _, idx) => {
    return (
      prev +
      // eslint-disable-next-line no-nested-ternary
      (columnVisibility[idx] && columnView[idx] && columnScale[idx]
        ? '300px '
        : columnVisibility[idx]
        ? '120px '
        : '')
    );
  }, 'auto ');
};
