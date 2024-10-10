import { Badge, Button, em, Flex, Group, Kbd, Stack, Text, Tooltip } from '@mantine/core';
import { useSettingsValue } from '../../../store/settings';
import { useDetailedHaulingRoutesValue, useHaulingRoutesValue } from '../../../store/haulingRoutes';
import { useEffect, useState } from 'react';
import { Route } from './DisplayRoutes';
import { IconRocket } from '@tabler/icons-react';
import classes from '../Main.module.css';

interface Route {
  origin: string[];
  destination: string[];
  price?: number;
  scu?: number;
}

function getBest(routes: Route[], maxScu?: number): Route[] {
  const matchCounts = new Map<Route, number>();

  for (let i = 0; i < routes.length; i++) {
    const routeA = routes[i];
    let matchCount = 0;

    for (let j = 0; j < routes.length; j++) {
      if (i === j) continue;
      const routeB = routes[j];

      const originMatch = routeA.origin.every((o) => routeB.origin.includes(o));
      const destinationMatch = routeA.destination.every((d) => routeB.destination.includes(d));

      if (originMatch && destinationMatch) {
        matchCount++;
      }
    }

    matchCounts.set(routeA, matchCount);
  }

  const maxMatchCount = Math.max(...Array.from(matchCounts.values()));
  const candidates = Array.from(matchCounts.keys()).filter((route) => matchCounts.get(route) === maxMatchCount);

  if (!maxScu) {
    return candidates;
  }

  const sortedCandidates = candidates
    .filter((route) => route.price !== undefined && route.scu !== undefined)
    .sort((a, b) => b.price! / b.scu! - a.price! / a.scu!);

  const selectedRoutes: Route[] = [];
  let currentScu = 0;

  for (const route of sortedCandidates) {
    if (route.scu! + currentScu <= maxScu) {
      selectedRoutes.push(route);
      currentScu += route.scu!;
    }

    if (currentScu >= maxScu) {
      break;
    }
  }

  return selectedRoutes;
}

interface BestTour {
  routes: Route[];
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
        routes: best,
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
        routes: best,
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
            maxHeight: em(200),
          }}
        >
          <div className={classes.routeWrapper}>
            {bestTour && settings.quickMode ? (
              <Route origin={bestTour.routes[0].origin} destination={bestTour.routes[0].destination} />
            ) : (
              bestTour?.routes.map((route, index) => <Route key={'display-route-' + index} {...route} />)
            )}
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
