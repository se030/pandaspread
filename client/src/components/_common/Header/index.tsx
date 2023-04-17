import { css } from '@emotion/react';

import FAB from '../FAB';

import { useRouter } from '@/hooks/useRouter';

const Header = () => {
  const { navigateHome } = useRouter();

  return (
    <header css={style.header}>
      <button onClick={navigateHome}>🐼</button>
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
