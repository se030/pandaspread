import { css, useTheme } from '@emotion/react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

import { useColumnView } from '@/hooks/useColumnView';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import { ThemeColor } from '@/styles/theme';

interface Props {
  idx: number;
}

const OptionButtons = ({ idx }: Props) => {
  const { columnView, toggleColumnView } = useColumnView(idx);
  const { columnVisibility, toggleColumnVisibility } = useColumnVisibility(idx);

  const { color } = useTheme();

  return (
    <>
      <button
        css={[style.button(color), style.view]}
        onClick={toggleColumnView}
      >
        {columnView[idx] ? 'vis' : 'raw'}
      </button>
      <button css={style.button(color)} onClick={toggleColumnVisibility}>
        {columnVisibility[idx] ? (
          <BsEyeFill className="icon" />
        ) : (
          <BsEyeSlashFill className="icon" />
        )}
      </button>
    </>
  );
};

export default OptionButtons;

const style = {
  button: ({ gray100, gray300 }: ThemeColor) =>
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
    }),
  view: css({
    width: '2rem',
  }),
};
