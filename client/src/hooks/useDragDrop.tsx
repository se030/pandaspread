import { type OnDragEndResponder } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';

import { columnOrderAtom } from '@/store/atom/columnOrder';

const useDragDrop = () => {
  const [, setColumnOrder] = useRecoilState(columnOrderAtom);

  const onDragEndResponder: OnDragEndResponder = (e) => {
    const { draggableId: target, source, destination } = e;

    if (!destination) return;

    const { index: srcIdx } = source;
    const { index: destIdx } = destination;

    if (srcIdx === destIdx) return;

    setColumnOrder((prev) => {
      if (srcIdx < destIdx) {
        return [
          ...prev.slice(0, srcIdx),
          ...prev.slice(srcIdx + 1, destIdx + 1),
          Number(target),
          ...prev.slice(destIdx + 1),
        ];
      } else {
        return [
          ...prev.slice(0, destIdx),
          Number(target),
          ...prev.slice(destIdx, srcIdx),
          ...prev.slice(srcIdx + 1),
        ];
      }
    });
  };

  return { onDragEnd: onDragEndResponder };
};

export { useDragDrop };
