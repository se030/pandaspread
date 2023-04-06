import { css, useTheme } from '@emotion/react';

interface Props {
  dataframe: Dataframe;
}

const Table = ({ dataframe }: Props) => {
  const { columns, data } = dataframe;

  const { color } = useTheme();
  const { gray100 } = color;

  return (
    <table css={style.table(gray100)}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th css={style.th} key={col}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {row.map((value) => (
              <td css={style.td} key={`${idx}-${value}`}>
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

const style = {
  table: (color: string) =>
    css({
      borderCollapse: 'collapse',
      th: {
        borderBottom: `1px solid ${color}`,
      },
    }),
  th: css({
    padding: '1rem',
    fontWeight: 'bold',
  }),
  td: css({
    padding: '1rem',
  }),
};
