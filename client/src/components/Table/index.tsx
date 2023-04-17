import { css, useTheme } from '@emotion/react';
import { useRecoilState } from 'recoil';

import Td from './Td';

import { ColumnContext } from '@/contexts/ColumnContext';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import { useSafeContext } from '@/hooks/useSafeContext';
import useVirtualScroll from '@/hooks/useVirtualScroll';
import { dataframeAtom } from '@/store/atom/dataframe';
import { ThemeColor } from '@/styles/theme';

const Table = () => {
  const [{ columns, data }] = useRecoilState(dataframeAtom);
  const { columnVisibility } = useColumnVisibility();

  const { start, offset, style: scrollStyle } = useVirtualScroll(data.length);

  const { columnRefs } = useSafeContext(ColumnContext);

  const { color } = useTheme();

  return (
    <table css={style.table(color)}>
      <thead>
        <tr>
          <th>Index</th>
          {columns.map((col, idx) => (
            <th
              key={col}
              hidden={!columnVisibility?.[idx]}
              ref={(ref) => ref && columnRefs.current.push(ref)}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
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
        <tr css={scrollStyle.dummy(data.length - start + offset)}></tr>
      </tbody>
    </table>
  );
};

export default Table;

const style = {
  table: ({ offwhite }: ThemeColor) =>
    css({
      width: '100%',
      height: '100%',
      borderCollapse: 'collapse',

      thead: {
        position: 'sticky',
        top: 0,
        zIndex: 1,
        boxShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
      },

      th: {
        '&:nth-of-type(1)': {
          width: 'fit-content', // Index column
        },

        padding: '2rem 1rem 1.5rem 1rem',
        fontWeight: 'bold',
        backgroundColor: offwhite,
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
