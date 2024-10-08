import React from 'react';
import Header from './padges/Header/Header';
import Main from './padges/Main/Main';
import classes from './App.module.css';

const App: React.FC = () => {
  return (
    <div className={classes.wrapper}>
      <Header />
      <Main />
    </div>
  );
};

export default App;
