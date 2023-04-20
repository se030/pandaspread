import { css } from '@emotion/react';
import { MouseEventHandler } from 'react';
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
    <li key={idx} onClick={onSelect}>
      <div>
        <button>
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
