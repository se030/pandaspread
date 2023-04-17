import { css, useTheme } from '@emotion/react';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { useRecoilState } from 'recoil';

import { ViewButton, VisibilityButton } from './OptionButtons';

import { useClickFactor } from '@/hooks/useClickFactor';
import { dataframeAtom } from '@/store/atom/dataframe';
import { ThemeColor } from '@/styles/theme';

const FactorList = () => {
  const [{ columns }] = useRecoilState(dataframeAtom);

  const { onClickFactor } = useClickFactor();

  const { color } = useTheme();

  return (
    <ol css={style.ol(color)}>
      {columns?.map((el, idx) => (
        <li key={idx} onClick={() => onClickFactor(idx)}>
          <div>
            <button>
              <RxDragHandleDots2 />
            </button>
            <span>{el}</span>
          </div>
          <div>
            <ViewButton idx={idx} />
            <VisibilityButton idx={idx} />
          </div>
        </li>
      ))}
    </ol>
  );
};

export default FactorList;

const style = {
  ol: ({ gray100, black }: ThemeColor) =>
    css({
      li: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        borderBottom: `1px solid ${gray100}`,
        cursor: 'pointer',
        ':hover': {
          fontWeight: 'bold',
        },

        '& > div:nth-of-type(1)': {
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',

          '& > button': {
            color: gray100,
          },
          '& > span': {
            color: black,
          },
        },
      },
    }),
};
