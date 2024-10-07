import { useRef } from 'react';
import classes from './Main.module.css';

const Main = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={mainRef} className={classes.wrapper}>
      <div className={classes.container}>Test</div>
    </main>
  );
};

export default Main;
