import useSafeContext from './useSafeContext';

import { ColumnContext } from '@/contexts/ColumnContext';

const useClickFactor = () => {
  const { columnRefs } = useSafeContext(ColumnContext);

  const onClickFactor = (idx: number) => {
    if (!columnRefs.current) return;

    columnRefs.current[idx].scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'start',
    });
  };

  return { onClickFactor };
};

export default useClickFactor;
