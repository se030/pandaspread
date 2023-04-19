import { css, useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import {
  CleanseButton,
  SortButton,
  ViewButton,
  VisibilityButton,
} from './OptionButtons';

import { getNACount } from '@/apis/dataframe-na';
import { useClickFactor } from '@/hooks/useClickFactor';
import { dataframeAtom } from '@/store/atom/dataframe';
import { ThemeColor } from '@/styles/theme';

const FactorList = () => {
  const [{ columns }] = useRecoilState(dataframeAtom);

  const { onClickFactor } = useClickFactor();

  const { id } = useParams();
  const [naCounts, setNaCounts] = useState<number[] | null>(null);
  const loadNaCount = async () => {
    if (id === undefined) return;

    const { data } = await getNACount(id);
    setNaCounts(data);
  };
  useEffect(() => {
    loadNaCount();
  }, [columns]);

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
          <div css={style.buttonGrid}>
            <ViewButton idx={idx} />
            <VisibilityButton idx={idx} />
            <CleanseButton column={el} naCount={naCounts && naCounts[idx]} />
            <SortButton column={el} />
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
        alignItems: 'flex-start',
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
          transform: 'translateY(0.5rem)',

          '& > button': {
            color: gray100,
          },
          '& > span': {
            color: black,
          },
        },
      },
    }),

  buttonGrid: css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.25rem',
  }),
};
