export const color = {
  primary: '#00c9c8',
  primaryDark: '#009292',
  offwhite: '#f5f5f5',
  gray100: '#c6c6c6',
  gray200: '#919191',
  gray300: '#5e5e5e',
  black: '#222222',
} as const;

export const theme = { color };

export type ThemeColor = typeof color;
