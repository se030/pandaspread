import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { dataframeAtom } from '@/store/atom/dataframe';

const useRouter = () => {
  const navigate = useNavigate();
  const [, setDataframe] = useRecoilState(dataframeAtom);

  const navigateHome = () => {
    setDataframe({
      columns: [],
      index: [],
      data: [],
    });
    navigate('/');
  };

  return { navigateHome };
};

export { useRouter };
