import { useRef } from 'react';

type UseThrottle = <T extends unknown[]>(
  callback: (...params: T) => void,
  delay?: number,
) => (...params: T) => void;

const useThrottle: UseThrottle = (callback, delay = 500) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...params) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      callback(...params);

      timer.current = null;
    }, delay);
  };
};

export { useThrottle };
