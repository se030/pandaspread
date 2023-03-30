import { Routes as ReactRouterRoutes, Route } from 'react-router-dom';

import DataPage from '@/pages/DataPage';
import IndexPage from '@/pages/IndexPage';

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/data/:id" element={<DataPage />} />
    </ReactRouterRoutes>
  );
};

export default Routes;
