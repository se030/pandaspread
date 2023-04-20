import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { getDataframe } from '@/apis/dataframe';
import { columnOrderAtom } from '@/store/atom/columnOrder';
import { dataframeAtom } from '@/store/atom/dataframe';

const useDataframe = () => {
  const { state } = useLocation();
  const { id } = useParams();

  const [dataframe, setDataframe] = useRecoilState(dataframeAtom);
  const [, setColumnOrder] = useRecoilState(columnOrderAtom);

  const navigate = useNavigate();

  const loadDataframe = async () => {
    if (!id) return;

    const { data } = await getDataframe(id);

    if (!data) {
      navigate('/');
    }

    setDataframe(data);
    setColumnOrder(data.columns.map((_, idx) => idx));
  };

  useEffect(() => {
    if (!state || !state?.data) {
      loadDataframe();
      return;
    }

    const { data } = state;
    setDataframe(data);
    setColumnOrder(data.columns.map((_: unknown, idx: number) => idx));
  }, []);

  return { dataframe };
};

export { useDataframe };
