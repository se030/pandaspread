import { css } from '@emotion/react';
import { useRef } from 'react';

import Loader from '@/components/_common/Loader';
import Sidebar from '@/components/Sidebar';
import Table from '@/components/Table';
import { ColumnContext } from '@/contexts/ColumnContext';
import { ScrollContext } from '@/contexts/ScrollContext';
import { useDataframe } from '@/hooks/useDataframe';
import { useScroll } from '@/hooks/useScroll';

const DataPage = () => {
  const { dataframe } = useDataframe();

  const columnRefs = useRef<HTMLTableCellElement[]>([]);

  const { scrollTop, ref: sectionRef } = useScroll();

  return (
    <main css={style.main}>
      <ColumnContext.Provider value={{ columnRefs }}>
        {dataframe.columns.length ? (
          <>
            <Sidebar />
            <ScrollContext.Provider value={{ scrollTop }}>
              <section css={style.section} ref={sectionRef}>
                {dataframe && <Table dataframe={dataframe} />}
              </section>
            </ScrollContext.Provider>
          </>
        ) : (
          <Loader />
        )}
      </ColumnContext.Provider>
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
    padding: '0 2rem 1rem 2rem',
    overflowY: 'scroll',
  }),
};
