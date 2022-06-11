import React from 'react';
import s from './Searchbar.module.css';

const Searchbar = ({ children }) => (
  <header className={s.Searchbar}>{children}</header>
);

export default Searchbar;
