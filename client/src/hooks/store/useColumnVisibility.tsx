import { MouseEventHandler } from 'react';
import { useRecoilState } from 'recoil';

import { columnVisibilityAtom } from '@/store/atom/coulmnVisibility';

const useColumnVisibility = (idx?: number) => {
  const [columnVisibility, setColumnVisibility] =
    useRecoilState(columnVisibilityAtom);

  if (idx === undefined) return { columnVisibility };

  const toggleColumnVisibility: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    setColumnVisibility((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];

      return updated;
    });
  };

  return { isVisible: columnVisibility[idx], toggleColumnVisibility };
};

export { useColumnVisibility };
