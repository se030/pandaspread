import { css, useTheme } from '@emotion/react';
import { useRecoilState } from 'recoil';

import { ColumnContext } from '@/contexts/ColumnContext';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import { useSafeContext } from '@/hooks/useSafeContext';
import { dataframeAtom } from '@/store/atom/dataframe';
import { ThemeColor } from '@/styles/theme';

const Thead = () => {
  const [{ columns }] = useRecoilState(dataframeAtom);
  const { columnVisibility } = useColumnVisibility();

  const { columnRefs } = useSafeContext(ColumnContext);

  const { color } = useTheme();

  return (
    <thead css={style.thead(color)}>
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
  );
};

export default Thead;

const style = {
  thead: ({ offwhite }: ThemeColor) =>
    css({
      position: 'sticky',
      top: 0,
      zIndex: 1,
      boxShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',

      th: {
        '&:nth-of-type(1)': {
          width: 'fit-content', // Index column
        },

        padding: '2rem 1rem 1.5rem 1rem',
        fontWeight: 'bold',
        backgroundColor: offwhite,
      },
    }),
  button: ({ gray100, gray300, black }: ThemeColor) =>
    css({
      color: gray300,
      fontSize: '0.75rem',
      lineHeight: '1rem',
      padding: '0.25rem',
      border: `1px solid ${gray100}`,
      borderRadius: '4px',

      '& > .icon': {
        transform: 'translateY(1.5px)',
      },

      '&:hover': {
        color: black,
        border: `1px solid ${gray300}`,
      },
    }),
};
