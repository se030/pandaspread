import { css } from '@emotion/react';

import Loader from '@/components/_common/Loader';
import Sidebar from '@/components/Sidebar';
import Table from '@/components/Table';
import useDataframe from '@/hooks/useDataframe';

const DataPage = () => {
  const { dataframe } = useDataframe();

  return (
    <main css={style.main}>
      {dataframe.columns.length ? (
        <>
          <Sidebar />
          <section css={style.section}>
            {dataframe && <Table dataframe={dataframe} />}
          </section>
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default DataPage;

const style = {
  main: css({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  }),
  section: css({
    width: 'calc(100% - 250px)',
    height: '100%',
    padding: '1rem 2rem',
    overflowY: 'scroll',
  }),
};
