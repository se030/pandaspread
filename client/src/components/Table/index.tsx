import { css, useTheme } from '@emotion/react';

import Td from './Td';

import { ColumnContext } from '@/contexts/ColumnContext';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import { useSafeContext } from '@/hooks/useSafeContext';
import { ThemeColor } from '@/styles/theme';

interface Props {
  dataframe: Dataframe;
}

const Table = ({ dataframe }: Props) => {
  const { columns, data } = dataframe;
  const { columnVisibility } = useColumnVisibility();

  const initialSlice = data.slice(0, 100); // TODO: pagination

  const { columnRefs } = useSafeContext(ColumnContext);

  const { color } = useTheme();

  return (
    <table css={style.table(color)}>
      <thead>
        <tr css={style.tr(columns.length)}>
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
      <tbody>
        {initialSlice.map((row, index) => (
          <tr key={index}>
            <td>{index}</td>
            {row.map((value, idx) => (
              <Td
                key={`${idx}-${value}-${columnVisibility?.[idx]}`}
                {...{ idx, value, hidden: !columnVisibility?.[idx] }}
              />
            ))}
          </tr>
        ))}
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
        padding: '2rem 1rem 1.5rem 1rem',
        fontWeight: 'bold',
        backgroundColor: offwhite,
      },
      td: {
        padding: '1rem',
      },
    }),
  tr: (columns: number) =>
    css({
      th: {
        width: `calc(100% / ${columns})`,

        '&:nth-of-type(1)': {
          width: 'fit-content',
        },
      },
    }),
};
