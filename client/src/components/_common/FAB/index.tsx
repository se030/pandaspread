import { css, useTheme } from '@emotion/react';
import { useLocation } from 'react-router-dom';

import FileSaver from './FileSaver';
import FileUploader from './FileUploader';

const FAB = () => {
  const { pathname } = useLocation();
  const hasData = pathname.includes('data');

  const { color } = useTheme();
  const { primary } = color;

  return (
    <button css={style.button(primary)}>
      {hasData ? <FileSaver /> : <FileUploader />}
    </button>
  );
};

export default FAB;

const style = {
  button: (color: string) =>
    css({
      position: 'absolute',
      top: '20px',
      right: '24px',
      width: 'calc(40px + 2rem)',
      height: 'calc(40px + 2rem)',
      borderRadius: '50%',
      backgroundColor: color,
      boxShadow: '2px 2px 5px 1px rgba(0, 0, 0, 0.2)',
      ':hover': {
        transform: 'scale(1.01)',
      },
    }),
};
