import { css } from '@emotion/react';

import { theme } from '@/styles/theme';

const Loader = () => {
  return (
    <div css={style.container}>
      <div css={style.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;

const style = {
  container: css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  loader: css`
    position: relative;
    width: 64px;
    height: 64px;

    div {
      position: absolute;
      top: 33px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${theme.color.primary};
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    @keyframes ellipsis1 {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes ellipsis2 {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(24px, 0);
      }
    }
    @keyframes ellipsis3 {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0);
      }
    }

    div:nth-of-type(1) {
      left: 8px;
      animation: ellipsis1 0.6s infinite;
    }

    div:nth-of-type(2) {
      left: 8px;
      animation: ellipsis2 0.6s infinite;
    }

    div:nth-of-type(3) {
      left: 32px;
      animation: ellipsis2 0.6s infinite;
    }

    div:nth-of-type(4) {
      left: 56px;
      animation: ellipsis3 0.6s infinite;
    }
  `,
};
