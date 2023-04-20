import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const SampleCard = () => {
  const navigate = useNavigate();

  return (
    <div css={style.container} onClick={() => navigate('/data/sample')}>
      <img width="500px" height="280px" src="/preview.png" />
      <p css={style.title}>
        <span className="title">Demo with sample data</span>
        <span>bike_buyers.csv</span>
      </p>
    </div>
  );
};

export default SampleCard;

const style = {
  container: css({
    width: 'fit-content',
    padding: '2rem 2rem 3rem 2rem',
    margin: 'auto',
    marginTop: '150px',
    borderRadius: '1rem',
    boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',

    '&:hover': {
      transform: 'scale(1.01)',
    },
  }),

  title: css({
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: '3rem',

    span: {
      fontSize: '0.7rem',

      '&.title': {
        fontSize: '1rem',
        fontWeight: 'bold',
      },
    },
  }),
};
