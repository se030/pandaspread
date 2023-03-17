import { Routes as ReactRouterRoutes, Route } from 'react-router-dom';

import IndexPage from '@/pages/IndexPage';

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<IndexPage />} />
    </ReactRouterRoutes>
  );
};

export default Routes;
