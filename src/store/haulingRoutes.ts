import { atom, useAtom } from "jotai"

interface NameListe {
    [key:string]: {}
}

interface HaulingRoute {
    origin: NameListe
    destination: NameListe
}

interface DetailedHaulingRoute extends HaulingRoute {
    price: number
    scu: number
}

const routeAtom = atom<HaulingRoute[]>([])
const detailedRouteAtom = atom<DetailedHaulingRoute[]>([])

const useHaulingRoutes = () => useAtom(routeAtom)
const useDetailedHaulingRoutes = () => useAtom(detailedRouteAtom)