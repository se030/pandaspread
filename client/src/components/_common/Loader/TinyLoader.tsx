import { css } from '@emotion/react';

import { color } from '@/styles/theme';

const TinyLoader = () => {
  return (
    <div css={style.container}>
      <div css={style.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default TinyLoader;

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
    width: 16px;
    height: 16px;
    transform: scale(0.9);

    div {
      transform-origin: 8px 8px;
      animation: spinner 1.2s linear infinite;
    }
    div:after {
      content: ' ';
      display: block;
      position: absolute;
      top: 0.6px;
      left: 7.4px;
      width: 1.2px;
      height: 4px;
      border-radius: 20%;
      background: ${color.gray200};
    }
    div:nth-of-type(1) {
      transform: rotate(0deg);
      animation-delay: -1.1s;
    }
    div:nth-of-type(2) {
      transform: rotate(30deg);
      animation-delay: -1s;
    }
    div:nth-of-type(3) {
      transform: rotate(60deg);
      animation-delay: -0.9s;
    }
    div:nth-of-type(4) {
      transform: rotate(90deg);
      animation-delay: -0.8s;
    }
    div:nth-of-type(5) {
      transform: rotate(120deg);
      animation-delay: -0.7s;
    }
    div:nth-of-type(6) {
      transform: rotate(150deg);
      animation-delay: -0.6s;
    }
    div:nth-of-type(7) {
      transform: rotate(180deg);
      animation-delay: -0.5s;
    }
    div:nth-of-type(8) {
      transform: rotate(210deg);
      animation-delay: -0.4s;
    }
    div:nth-of-type(9) {
      transform: rotate(240deg);
      animation-delay: -0.3s;
    }
    div:nth-of-type(10) {
      transform: rotate(270deg);
      animation-delay: -0.2s;
    }
    div:nth-of-type(11) {
      transform: rotate(300deg);
      animation-delay: -0.1s;
    }
    div:nth-of-type(12) {
      transform: rotate(330deg);
      animation-delay: 0s;
    }
    @keyframes spinner {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  `,
};
