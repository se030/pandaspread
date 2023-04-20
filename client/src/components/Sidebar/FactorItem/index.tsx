import { css } from '@emotion/react';
import { MouseEventHandler } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { RxDragHandleDots2 } from 'react-icons/rx';

import {
  CleanseButton,
  SortButton,
  ViewButton,
  VisibilityButton,
} from './OptionButtons';

interface Props {
  idx: number;
  title: string;
  naCount: number | null;
  onSelect: MouseEventHandler<HTMLLIElement>;
}

const FactorItem = ({ idx, title, naCount, onSelect }: Props) => {
  return (
    <Draggable index={idx} draggableId={`${idx}`}>
      {(provided) => (
        <li
          key={idx}
          onClick={onSelect}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div>
            <button {...provided.dragHandleProps}>
              <RxDragHandleDots2 />
            </button>
            <span>{title}</span>
          </div>
          <div css={style.buttonGrid}>
            <ViewButton idx={idx} />
            <VisibilityButton idx={idx} />
            <CleanseButton column={title} naCount={naCount} />
            <SortButton column={title} />
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default FactorItem;

const style = {
  buttonGrid: css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.25rem',
  }),
};
