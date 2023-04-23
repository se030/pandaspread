import { MouseEventHandler } from 'react';
import { useRecoilState } from 'recoil';

import { columnViewAtom } from '@/store/atom/columnView';

const useColumnView = (idx?: number) => {
  const [columnView, setColumnView] = useRecoilState(columnViewAtom);

  if (idx === undefined) return { columnView };

  const toggleColumnView: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    setColumnView((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];

      return updated;
    });
  };

  return { isVisualized: columnView[idx], toggleColumnView };
};

export { useColumnView };
