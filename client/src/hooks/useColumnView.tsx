import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { columnViewAtom } from '@/store/atom/columnView';
import { dataframeAtom } from '@/store/atom/dataframe';

const useColumnView = (idx?: number) => {
  const [{ columns }] = useRecoilState(dataframeAtom);

  const [columnView, setColumnView] = useRecoilState(columnViewAtom);

  useEffect(() => {
    const initialState = Array.from({ length: columns.length }).fill(
      true,
    ) as boolean[];

    setColumnView(initialState);
  }, [columns]);

  if (idx === undefined) return { columnView };

  const toggleColumnView = () => {
    setColumnView((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];

      return updated;
    });
  };

  return { isVisualized: columnView[idx], toggleColumnView };
};

export { useColumnView };
