import { css } from '@emotion/react';

import FactorList from './FactorList';

const Sidebar = () => {
  return (
    <aside css={style.aside}>
      <FactorList />
    </aside>
  );
};

export default Sidebar;

const style = {
  aside: css({
    zIndex: 10,
    width: '250px',
    height: '100%',
    padding: '0.5rem',
    boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.1)',
    overflowY: 'scroll',
    '::-webkit-scrollbar': {
      width: '0',
    },
  }),
};
