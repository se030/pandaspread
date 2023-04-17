import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { getDataframe } from '@/apis/dataframe';
import { dataframeAtom } from '@/store/atom/dataframe';

const useDataframe = () => {
  const { state } = useLocation();
  const { id } = useParams();

  const [dataframe, setDataframe] = useRecoilState(dataframeAtom);

  const loadDataframe = async () => {
    if (!id) return;

    const { data } = await getDataframe(id);
    setDataframe(data);
  };

  useEffect(() => {
    if (!state || !state?.data) {
      loadDataframe();
      return;
    }

    setDataframe(state.data);
  }, []);

  return { dataframe };
};

export { useDataframe };
