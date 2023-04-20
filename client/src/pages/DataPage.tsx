import { css } from '@emotion/react';
import { useRef } from 'react';

import Loader from '@/components/_common/Loader';
import DataSection from '@/components/DataSection';
import Sidebar from '@/components/Sidebar';
import { ColumnContext } from '@/contexts/ColumnContext';
import { useDataframe } from '@/hooks/store/useDataframe';

const DataPage = () => {
  const { dataframe } = useDataframe();
  const columnRefs = useRef<HTMLTableCellElement[]>([]);

  return (
    <main css={style}>
      {dataframe.columns.length ? (
        <ColumnContext.Provider value={{ columnRefs }}>
          <Sidebar />
          <DataSection />
        </ColumnContext.Provider>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default DataPage;

const style = css({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
});
