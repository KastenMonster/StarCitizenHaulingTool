import { Badge, Button, em, Flex, Group, Indicator, Kbd, Stack, Text, Tooltip } from '@mantine/core';
import { useSettingsValue } from '../../../store/settings';
import { useDetailedHaulingRoutesValue, useHaulingRoutesValue } from '../../../store/haulingRoutes';
import { useEffect, useState } from 'react';
import { Route } from './DisplayRoutes';
import { IconRocket } from '@tabler/icons-react';
import classes from '../Main.module.css';
import { getBest } from '../../../utils/getBestTour';
import { FilteredRoute, filterTour } from '../../../utils/filterTour';

interface BestTour {
  routes: FilteredRoute[];
  maxScu?: number;
  profit?: number;
}

const TourWidget = () => {
  const settings = useSettingsValue();
  const hRoutes = useHaulingRoutesValue();
  const dHRoutes = useDetailedHaulingRoutesValue();
  const [bestTour, setBestTour] = useState<BestTour | null>(null);

  useEffect(() => {
    if (settings.quickMode) {
      const best = getBest(hRoutes);
      if (!best || best.length <= 0) {
        setBestTour(null);
        return;
      }

      setBestTour({
        routes: filterTour(best),
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
        {!bestTour && (
          <Text c={'dimmed'} size="sm">
            Please add routes via the field or by using <Kbd>STRG + K</Kbd>
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
          <Button disabled={!bestTour} color="green" variant="light" fullWidth size="compact-md">
            <IconRocket />
          </Button>
        </Tooltip>
      </Stack>
    </>
  );
};

export default TourWidget;
