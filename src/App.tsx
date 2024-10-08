import React from 'react';
import Header from './padges/Header/Header';
import Main from './padges/Main/Main';
import classes from './App.module.css';
import Copyright from './components/Copyright';

const App: React.FC = () => {
  return (
    <div className={classes.wrapper}>
      <Copyright />
      <Header />
      <Main />
    </div>
  );
};

export default App;
