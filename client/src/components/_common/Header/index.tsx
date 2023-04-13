import { css } from '@emotion/react';

import FAB from '../FAB';

const Header = () => {
  return (
    <header css={style.header}>
      <span>🐼</span>
      <FAB />
    </header>
  );
};

export default Header;

const style = {
  header: css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100vw',
    height: 'fit-content',
    padding: '20px 24px 16px 24px',
    boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.1)',
    fontSize: '2rem',
  }),
};
