import { css, useTheme } from '@emotion/react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/_common/Header';

const Layout = () => {
  const { color } = useTheme();
  const { offwhite } = color;

  return (
    <div
      css={css({
        width: '100vw',
        height: '100vh',
        backgroundColor: offwhite,
        overflow: 'hidden',
      })}
    >
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
