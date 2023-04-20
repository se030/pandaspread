import { css, useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import FactorItem from '../FactorItem';

import { getNACount } from '@/apis/dataframe-na';
import { useClickFactor } from '@/hooks/useClickFactor';
import { useDragDrop } from '@/hooks/useDragDrop';
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

  const dragDropProps = useDragDrop();

  return (
    <DragDropContext {...dragDropProps}>
      <Droppable droppableId="factor-droppable">
        {(provided) => (
          <ol
            css={style.ol(color)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {columns?.map((el, idx) => (
              <FactorItem
                key={el}
                idx={idx}
                title={el}
                naCount={naCounts && naCounts[idx]}
                onSelect={() => onClickFactor(idx)}
              />
            ))}
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default FactorList;

const style = {
  ol: ({ gray100, black, offwhite }: ThemeColor) =>
    css({
      li: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '1rem',
        backgroundColor: offwhite,
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
};
