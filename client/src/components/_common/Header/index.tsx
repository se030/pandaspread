import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import FAB from '../FAB';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header css={style.header}>
      <button onClick={() => navigate('/')}>🐼</button>
      <FAB />
    </header>
  );
};

export default Header;

const style = {
  header: css({
    position: 'relative',
    zIndex: 99,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100vw',
    height: 'fit-content',
    padding: '20px 24px 16px 24px',
    boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.1)',

    button: {
      fontSize: '2rem',
    },
  }),
};
