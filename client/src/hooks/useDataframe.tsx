import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { getDataframe } from '@/apis/dataframe';

const useDataframe = () => {
  const { state } = useLocation();

  const { id } = useParams();
  const [dataframe, setDataframe] = useState<Dataframe | null>(
    state?.data ?? null,
  );

  const loadDataframe = async () => {
    if (!id) return;

    const { data } = await getDataframe(id);
    setDataframe(data);
  };

  useEffect(() => {
    if (!dataframe) loadDataframe();
  }, []);

  return { dataframe };
};

export default useDataframe;
