import { css, useTheme } from '@emotion/react';
import { MouseEventHandler } from 'react';
import { AiOutlineClear } from 'react-icons/ai';
import { BiSortDown, BiSortUp } from 'react-icons/bi';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { deleteNA } from '@/apis/dataframe';
import { useColumnView } from '@/hooks/useColumnView';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import { dataframeAtom } from '@/store/atom/dataframe';
import { ThemeColor } from '@/styles/theme';

interface Props {
  idx: number;
}

export const ViewButton = ({ idx }: Props) => {
  const { isVisualized, toggleColumnView } = useColumnView(idx);

  const { color } = useTheme();

  return (
    <button css={[style.button(color), style.text]} onClick={toggleColumnView}>
      {isVisualized ? 'vis' : 'raw'}
    </button>
  );
};

export const VisibilityButton = ({ idx }: Props) => {
  const { isVisible, toggleColumnVisibility } = useColumnVisibility(idx);

  const { color } = useTheme();

  return (
    <button css={style.button(color)} onClick={toggleColumnVisibility}>
      {isVisible ? (
        <BsEyeFill className="icon" />
      ) : (
        <BsEyeSlashFill className="icon" />
      )}
    </button>
  );
};

interface CleanseButtonProps {
  column: string;
  naCount: number | null;
}

export const CleanseButton = ({ column, naCount }: CleanseButtonProps) => {
  const { id } = useParams();
  const [, setDataframe] = useRecoilState(dataframeAtom);

  const onCleanse: MouseEventHandler = async (e) => {
    e.stopPropagation();

    if (!id) return;

    const { data } = await deleteNA(id, column);
    setDataframe(data);
  };

  const { color } = useTheme();

  return (
    <button css={style.button(color)} onClick={onCleanse}>
      {naCount === null ? '' : naCount}
      <AiOutlineClear className="icon" />
    </button>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SortButton = ({ idx }: Props) => {
  const { color } = useTheme();

  return (
    <button css={style.button(color)} onClick={(e) => e.stopPropagation()}>
      {
        // eslint-disable-next-line no-constant-condition
        true ? <BiSortDown className="icon" /> : <BiSortUp className="icon" />
      }
    </button>
  );
};

const style = {
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
  text: css({
    width: '2rem',
  }),
};
