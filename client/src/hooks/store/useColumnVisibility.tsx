import { MouseEventHandler, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { columnVisibilityAtom } from '@/store/atom/coulmnVisibility';
import { dataframeAtom } from '@/store/atom/dataframe';

const useColumnVisibility = (idx?: number) => {
  const [{ columns }] = useRecoilState(dataframeAtom);

  const [columnVisibility, setColumnVisibility] =
    useRecoilState(columnVisibilityAtom);

  const { id } = useParams();

  useEffect(() => {
    const initialState = Array.from({ length: columns.length }).fill(
      true,
    ) as boolean[];

    setColumnVisibility(initialState);
  }, [id]);

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
