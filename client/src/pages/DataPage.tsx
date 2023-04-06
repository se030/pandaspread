import { css } from '@emotion/react';

import Table from '@/components/Table';
import useDataframe from '@/hooks/useDataframe';

const DataPage = () => {
  const { dataframe } = useDataframe();

  return (
    <section css={style.section}>
      {dataframe && <Table dataframe={dataframe} />}
    </section>
  );
};

export default DataPage;

const style = {
  section: css({
    height: '100%',
    padding: '1rem 2rem',
    overflowY: 'scroll',
  }),
};
