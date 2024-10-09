import { Badge, Button, Group, Kbd, Stack, Text, Tooltip } from '@mantine/core';
import { useSettings } from '../../../store/settings';
import { useDetailedHaulingRoutes, useHaulingRoutes } from '../../../store/haulingRoutes';
import { useEffect, useState } from 'react';
import { Route } from './DisplayRoutes';
import { IconRocket } from '@tabler/icons-react';

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
    .filter((route) => route.price != null && route.scu != null)
    .sort((a, b) => a.price! / a.scu! - b.price! / b.scu!);

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
  route: Route;
  maxScu?: number;
  profit?: number;
}

const TourWidget = () => {
  const [settings, setSettings] = useSettings();
  const [hRoutes, setHRoutes] = useHaulingRoutes();
  const [dHRoutes, setDHRoutes] = useDetailedHaulingRoutes();
  const [bestTour, setBestTour] = useState<BestTour | null>(null);

  useEffect(() => {
    if (settings.quickMode) {
      const best = getBest(hRoutes);
      if (!best || best.length <= 0) {
        setBestTour(null);
        return;
      }

      setBestTour({
        route: best[0],
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
        route: best[0],
        maxScu: maxScu,
        profit: maxPrice,
      });
    }
  }, [hRoutes, dHRoutes]);

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
          <Group justify="flex-start" gap={'xs'}>
            <Badge color="blue" variant="light">
              {bestTour.profit}k
            </Badge>
            <Badge color="gray" variant="light">
              {bestTour.maxScu} SCU
            </Badge>
          </Group>
        )}
        {bestTour && <Route origin={bestTour.route.origin} destination={bestTour.route.destination} />}
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
