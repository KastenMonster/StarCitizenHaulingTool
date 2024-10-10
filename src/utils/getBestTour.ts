export interface TourRoute {
  origin: string[];
  destination: string[];
  price?: number;
  scu?: number;
}

export function getBest(routes: TourRoute[], maxScu?: number): TourRoute[] {
  const matchCounts = new Map<TourRoute, number>();

  // look through all Routes and pick though who fully match
  for (let i = 0; i < routes.length; i++) {
    const routeA = routes[i];
    let matchCount = 0;

    for (let j = 0; j < routes.length; j++) {
      if (i === j) continue;
      const routeB = routes[j];

      const originMatch =
        routeA.origin.every((o) => routeB.origin.includes(o)) && routeA.origin.length === routeB.origin.length;
      const destinationMatch =
        routeA.destination.every((d) => routeB.destination.includes(d)) &&
        routeA.destination.length === routeB.destination.length;

      if (originMatch && destinationMatch) {
        matchCount++;
      }
    }

    matchCounts.set(routeA, matchCount);
  }

  const maxMatchCount = Math.max(...Array.from(matchCounts.values()));
  const candidates = Array.from(matchCounts.keys()).filter((route) => matchCounts.get(route) === maxMatchCount);
  const subCandidates = Array.from(matchCounts.keys()).filter((route) => {
    if (matchCounts.get(route) === maxMatchCount) return false;

    for (let i = 0; i < candidates.length; i++) {
      if (route.destination.length <= candidates[i].destination.length) {
        const originMatch = route.origin.every((o) => candidates[i].origin.includes(o));
        const destinationMatch = route.destination.every((d) => candidates[i].destination.includes(d));

        if (originMatch && destinationMatch) return true;
      }
    }

    return false;
  });

  if (!maxScu) {
    candidates.push.apply(candidates, subCandidates);
    return candidates;
  }

  const sortedCandidates = candidates
    .filter((route) => route.price !== undefined && route.scu !== undefined)
    .sort((a, b) => b.price! / b.scu! - a.price! / a.scu!);

  const sortedSubCandidates = subCandidates
    .filter((route) => route.price !== undefined && route.scu !== undefined)
    .sort((a, b) => b.price! / b.scu! - a.price! / a.scu!);

  const selectedRoutes: TourRoute[] = [];
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

  for (const route of sortedSubCandidates) {
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
