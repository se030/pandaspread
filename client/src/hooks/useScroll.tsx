import { useEffect, useRef, useState } from 'react';

const useScroll = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const ref = useRef<HTMLUnknownElement>(null);

  const onScroll = (e: Event) => {
    const target = e.target;

    if (!(target instanceof HTMLElement)) return;

    setScrollTop(target.scrollTop);
  };

  useEffect(() => {
    const scrollContainer = ref.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener('scroll', onScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', onScroll);
    };
  }, []);

  return { scrollTop, ref };
};

export { useScroll };
