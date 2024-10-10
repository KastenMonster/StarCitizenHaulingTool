import { atom, useAtom, useAtomValue } from 'jotai';

interface HaulingRoute {
  origin: string[];
  destination: string[];
}

interface DetailedHaulingRoute extends HaulingRoute {
  price: number;
  scu: number;
}

const mockData:HaulingRoute[] = [
  {
    origin: ['tressler', 'bab'],
    destination: ['greycat', 'pyro']
  },
  {
    origin: ['tressler', 'bab'],
    destination: ['greycat', 'pyro']
  },
  {
    origin: ['tressler', 'bab'],
    destination: ['pyro']
  },
  {
    origin: ['tressler', 'bab'],
    destination: ['greycat']
  },
  {
    origin: ['tressler', 'bab'],
    destination: ['greycat']
  }
]

const routeAtom = atom<HaulingRoute[]>(mockData);
const detailedRouteAtom = atom<DetailedHaulingRoute[]>([]);

export const useHaulingRoutes = () => useAtom(routeAtom);
export const useHaulingRoutesValue = () => useAtomValue(routeAtom);
export const useDetailedHaulingRoutes = () => useAtom(detailedRouteAtom);
export const useDetailedHaulingRoutesValue = () => useAtomValue(detailedRouteAtom);
