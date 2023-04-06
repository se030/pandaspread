import { css } from '@emotion/react';

export const form = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  width: '300px',
  margin: 'auto',
  marginTop: '3rem',
});

export const label = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  height: '30px',
  color: 'black',
});

export const input = css({
  display: 'none',
});

export const button = css({
  width: 'fit-content',
  padding: '10px',
  borderRadius: '8px',
  color: 'white',
  background: 'black',
});
