import { Routes as ReactRouterRoutes, Route } from 'react-router-dom';

import Layout from '@/components/_common/Layout';
import DataPage from '@/pages/DataPage';
import IndexPage from '@/pages/IndexPage';

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/data/:id" element={<DataPage />} />
      </Route>
    </ReactRouterRoutes>
  );
};

export default Routes;
