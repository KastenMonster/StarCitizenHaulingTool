import { useRef } from 'react';
import classes from './Main.module.css';
import CreateRouteWidget from './components/CreateRouteWidget';
import TourWidget from './components/TourWidget';
import HistoryWidget from './components/TotalProfitWidget';
import { useSettingsValue } from '../../store/settings';

const Main = () => {
  const settings = useSettingsValue()

  return (
    <main className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.widgetWrapper}>
          <div className={classes.widget}>
            <CreateRouteWidget />
          </div>
        </div>
        <div className={classes.widgetWrapper}>
          {!settings.quickMode && (
            <div className={classes.widget}>
              <HistoryWidget />
            </div>
          )}
          <div className={classes.widget}>
            <TourWidget />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
