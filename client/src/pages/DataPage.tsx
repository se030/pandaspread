import Table from '@/components/Table';
import useDataframe from '@/hooks/useDataframe';

const DataPage = () => {
  const { dataframe } = useDataframe();

  return dataframe && <Table dataframe={dataframe} />;
};

export default DataPage;
