import { createContext } from 'react';

interface ScrollContextValue {
  scrollTop: number;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export { ScrollContext };
