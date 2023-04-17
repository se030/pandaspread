import { css, useTheme } from '@emotion/react';
import { AiOutlineClear } from 'react-icons/ai';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

import { useColumnView } from '@/hooks/useColumnView';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
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

export const CleanseButton = ({
  idx,
  naCounts,
}: Props & { naCounts: number[] | null }) => {
  const { color } = useTheme();

  return (
    <button css={style.button(color)}>
      {naCounts && naCounts[idx]}
      <AiOutlineClear className="icon" />
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
