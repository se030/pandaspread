import { Context, useContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useSafeContext: <T extends Context<any>>(
  Context: T,
) => T extends Context<infer U> ? Exclude<U, null> : never = (Context) => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Wrap your component with appropriate context provider');
  }

  return context;
};

export { useSafeContext };
