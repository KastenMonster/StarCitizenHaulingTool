import { atom, useAtom } from 'jotai';

interface HaulingRoute {
  origin: string[];
  destination: string[];
}

interface DetailedHaulingRoute extends HaulingRoute {
  price: number;
  scu: number;
}

const routeAtom = atom<HaulingRoute[]>([
  {
    origin: ['Port Tressler', 'Grey Cat Was weiß ich VI'],
    destination: ['Int. Spacstaion']
  },
  {
    origin: ['Port Tressler', 'Grey Cat Was weiß ich VI'],
    destination: ['Int. Spacstaion']
  },
  {
    origin: ['Port Tressler', 'Grey Cat Was weiß ich VI'],
    destination: ['Int. Spacstaion']
  },{
    origin: ['Port Tressler', 'Grey Cat Was weiß ich VI'],
    destination: ['Int. Spacstaion']
  },
  {
    origin: ['Port Tressler', 'Grey Cat Was weiß ich VI'],
    destination: ['Int. Spacstaion']
  },
  {
    origin: ['Port Tressler', 'Grey Cat Was weiß ich VI'],
    destination: ['Int. Spacstaion']
  },
  {
    origin: ['Port Tressler', 'Grey Cat Was weiß ich VI'],
    destination: ['Int. Spacstaion']
  },
  {
    origin: ['Port Tressler', 'Grey Cat Was weiß ich VI'],
    destination: ['Int. Spacstaion']
  },
  {
    origin: ['Port Tressler', 'Grey Cat Was weiß ich VI'],
    destination: ['Int. Spacstaion']
  },
  {
    origin: ['Port Tressler', 'Grey Cat Was weiß ich VI'],
    destination: ['Int. Spacstaion']
  },
  {
    origin: ['Port Tressler', 'Grey Cat Was weiß ich VI'],
    destination: ['Int. Spacstaion']
  },
  {
    origin: ['Port Tressler', 'Grey Cat Was weiß ich VI'],
    destination: ['Int. Spacstaion']
  },
  {
    origin: ['Port Tressler', 'Grey Cat Was weiß ich VI'],
    destination: ['Int. Spacstaion']
  },
  {
    origin: ['Port Tressler', 'Grey Cat Was weiß ich VI'],
    destination: ['Int. Spacstaion']
  },
  {
    origin: ['Port Tressler', 'Grey Cat Was weiß ich VI'],
    destination: ['Int. Spacstaion']
  },
  {
    origin: ['Port Tressler', 'Grey Cat Was weiß ich VI'],
    destination: ['Int. Spacstaion']
  },
  {
    origin: ['Port Tressler', 'Grey Cat Was weiß ich VI'],
    destination: ['Int. Spacstaion']
  },
  {
    origin: ['Port Tressler', 'Grey Cat Was weiß ich VI'],
    destination: ['Int. Spacstaion']
  }
]);
const detailedRouteAtom = atom<DetailedHaulingRoute[]>([]);

export const useHaulingRoutes = () => useAtom(routeAtom);
export const useDetailedHaulingRoutes = () => useAtom(detailedRouteAtom);
