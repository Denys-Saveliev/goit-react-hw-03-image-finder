import React from 'react';
import s from './LoadMore.module.css';

const LoadMore = ({ onClick }) => (
  <button type="button" onClick={onClick} className={s.Button}>
    Load more
  </button>
);

export default LoadMore;
