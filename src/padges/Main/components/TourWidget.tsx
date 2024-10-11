import { Badge, Button, em, Flex, Group, Indicator, Kbd, Stack, Text, Tooltip } from '@mantine/core';
import { useSettingsValue } from '../../../store/settings';
import { useDetailedHaulingRoutes, useHaulingRoutes } from '../../../store/haulingRoutes';
import { useEffect, useState } from 'react';
import { Route } from './DisplayRoutes';
import { IconRocket } from '@tabler/icons-react';
import classes from '../Main.module.css';
import { getBest, TourRoute } from '../../../utils/getBestTour';
import { FilteredRoute, filterTour } from '../../../utils/filterTour';
import { useTotalProfit } from '../../../store/totalProfit';
import { useMediaQuery } from '@mantine/hooks';

interface BestTour {
  routes: FilteredRoute[];
  rawRoutes: TourRoute[];
  maxScu?: number;
  profit?: number;
}

const TourWidget = () => {
  const settings = useSettingsValue();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const [hRoutes, setHRoutes] = useHaulingRoutes();
  const [dHRoutes, setDHRoutes] = useDetailedHaulingRoutes();
  const [bestTour, setBestTour] = useState<BestTour | null>(null);
  const [total, setTotal] = useTotalProfit();

  useEffect(() => {
    if (settings.quickMode) {
      const best = getBest(hRoutes);
      if (!best || best.length <= 0) {
        setBestTour(null);
        return;
      }

      setBestTour({
        routes: filterTour(best),
        rawRoutes: best,
      });
    } else {
      const best = getBest(dHRoutes, settings.scu);
      if (!best || best.length <= 0) {
        setBestTour(null);
        return;
      }

      let maxPrice = 0;
      let maxScu = 0;

      best.forEach((route) => {
        maxPrice += route.price || 0;
        maxScu += route.scu || 0;
      });

      setBestTour({
        routes: filterTour(best),
        rawRoutes: best,
        maxScu: maxScu,
        profit: maxPrice,
      });
    }
  }, [hRoutes, dHRoutes, settings]);

  return (
    <>
      <Badge
        color="gray"
        style={{
          position: 'absolute',
          top: 0,
          left: '10px',
          transform: 'translateY(-70%)',
        }}
      >
        Tour
      </Badge>
      <Stack gap={'xs'}>
        {!bestTour && !isMobile && (
          <Text c={'dimmed'} size="sm">
            Please add routes via the plus button or by using <Kbd>CTRL + K</Kbd>
          </Text>
        )}
        {!bestTour && isMobile && (
          <Text c={'dimmed'} size="sm">
            Please add routes via the plus button at the bottom right
          </Text>
        )}
        {!settings.quickMode && bestTour?.maxScu && bestTour.profit && (
          <Group gap={'xs'}>
            <Flex gap={'xs'} justify={'center'}>
              <Text c={'dimmed'} size="sm">
                Profit:
              </Text>
              <Badge color="blue" variant="light">
                {bestTour.profit}k
              </Badge>
            </Flex>
            <Flex gap={'xs'} justify={'center'}>
              <Text c={'dimmed'} size="sm">
                Total:
              </Text>
              <Badge color="yellow" variant="light">
                {bestTour.maxScu} SCU
              </Badge>
            </Flex>
          </Group>
        )}
        <div
          style={{
            flexGrow: 1,
          }}
        >
          <div className={classes.routeWrapper}>
            {bestTour?.routes.map((route, index) => <Route key={'display-route-' + index} {...route} />)}
          </div>
        </div>
        <Tooltip label="Start">
          <Button
            disabled={!bestTour}
            color="green"
            variant="light"
            fullWidth
            size="compact-lg"
            onClick={() => {
              if (!settings.quickMode) setTotal(total + (bestTour?.profit || 0) * 1000);
              if (settings.clearOnStart) {
                setDHRoutes([]);
                setHRoutes([]);
              } else {
                if (settings.quickMode) {
                  const remainingRoutes = hRoutes.filter((v) => !bestTour?.rawRoutes.includes(v));
                  setHRoutes(remainingRoutes);
                } else {
                  const remainingRoutes = dHRoutes.filter((v) => !bestTour?.rawRoutes.includes(v));
                  setDHRoutes([...remainingRoutes]);
                }
              }
            }}
          >
            <IconRocket />
          </Button>
        </Tooltip>
      </Stack>
    </>
  );
};

export default TourWidget;
