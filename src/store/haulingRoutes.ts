import { atom, useAtom, useAtomValue } from 'jotai';

interface HaulingRoute {
  origin: string[];
  destination: string[];
}

interface DetailedHaulingRoute extends HaulingRoute {
  price: number;
  scu: number;
}

const routeAtom = atom<HaulingRoute[]>([]);
const detailedRouteAtom = atom<DetailedHaulingRoute[]>([]);

export const useHaulingRoutes = () => useAtom(routeAtom);
export const useHaulingRoutesValue = () => useAtomValue(routeAtom);
export const useDetailedHaulingRoutes = () => useAtom(detailedRouteAtom);
export const useDetailedHaulingRoutesValue = () => useAtomValue(detailedRouteAtom);
