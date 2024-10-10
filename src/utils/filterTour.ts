import { TourRoute } from './getBestTour';

export interface FilteredRoute extends TourRoute {
  duplicates: number;
}

export function filterTour(routes: TourRoute[]): FilteredRoute[] {
  const map = new Map();

  routes.forEach((item) => {
    const key = JSON.stringify(item); // Create a unique string key for each object
    if (map.has(key)) {
      map.set(key, map.get(key) + 1); // Increment duplicate count
    } else {
      map.set(key, 1); // First occurrence, set count to 1
    }
  });

  const result: FilteredRoute[] = Array.from(map, ([key, duplicates]) => {
    const obj = JSON.parse(key); // Convert key back to object
    return { ...obj, duplicates: duplicates }; // Append the duplicates count
  });

  return result;
}
