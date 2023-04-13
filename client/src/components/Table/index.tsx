import { css, useTheme } from '@emotion/react';

import Td from './Td';

import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import { ThemeColor } from '@/styles/theme';

interface Props {
  dataframe: Dataframe;
}

const Table = ({ dataframe }: Props) => {
  const { columns, data } = dataframe;
  const { columnVisibility } = useColumnVisibility();

  const initialSlice = data.slice(0, 100); // TODO: pagination

  const { color } = useTheme();

  return (
    <table css={style.table(color)}>
      <thead>
        <tr css={style.tr(columns.length)}>
          <th>Index</th>
          {columns.map((col, idx) => (
            <th key={col} hidden={!columnVisibility?.[idx]}>
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
  table: ({ gray100 }: ThemeColor) =>
    css({
      width: '100%',
      height: '100%',
      borderCollapse: 'collapse',

      th: {
        padding: '1rem',
        fontWeight: 'bold',
        borderBottom: `1px solid ${gray100}`,
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
