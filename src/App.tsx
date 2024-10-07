import React, { useState } from 'react';
import classes from './App.module.css';

const App: React.FC = () => {
  return (
    <div className={classes.wrapper}>
      Hello There
    </div>
  );
};

/*
  Dashboard
  Lager
  Bestellungen
*/

/*
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/transactions" element={<Transactions />} />
  <Route path="/accounts" element={<Accounts />} />
  <Route path="/invoices" element={<Invoices />} />
</Routes>
*/

export default App;
