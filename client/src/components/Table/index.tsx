import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';

import Td from './Td';
import Thead from './Thead';

import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import useVirtualScroll from '@/hooks/useVirtualScroll';
import { dataframeAtom } from '@/store/atom/dataframe';

const Table = () => {
  const [{ data }] = useRecoilState(dataframeAtom);
  const { columnVisibility } = useColumnVisibility();

  const { start, offset, style: scrollStyle } = useVirtualScroll(data.length);

  return (
    <table css={style.table}>
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
        <tr css={scrollStyle.dummy(data.length - start + offset)}></tr>
      </tbody>
    </table>
  );
};

export default Table;

const style = {
  table: css({
    width: '100%',
    height: '100%',
    borderCollapse: 'collapse',
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
