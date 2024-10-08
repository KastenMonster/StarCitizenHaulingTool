import { Badge } from "@mantine/core"
import { useSettings } from "../../../store/settings"
import { useDetailedHaulingRoutes, useHaulingRoutes } from "../../../store/haulingRoutes"

interface Route {
    origin: string[];
    destination: string[];
    price?: number;
    scu?: number;
}

function getBest(routes: Route[]): Route[] {
    const bestMatches: Route[] = [];
    const matchCounts = new Map<Route, number>();

    // Calculate match scores for origin and destination
    for (let i = 0; i < routes.length; i++) {
        const routeA = routes[i];
        let matchCount = 0;

        for (let j = 0; j < routes.length; j++) {
            if (i === j) continue;
            const routeB = routes[j];

            // Check if origins and destinations match
            const originMatch = routeA.origin.every((o) => routeB.origin.includes(o));
            const destinationMatch = routeA.destination.every((d) => routeB.destination.includes(d));

            if (originMatch && destinationMatch) {
                matchCount++;
            }
        }

        matchCounts.set(routeA, matchCount);
    }

    // Find the routes with the highest match count
    const maxMatchCount = Math.max(...Array.from(matchCounts.values()));
    const candidates = Array.from(matchCounts.keys()).filter((route) => matchCounts.get(route) === maxMatchCount);

    // If no price or scu, return the best matching candidates
    if (!routes.some((route) => route.price != null && route.scu != null)) {
        return candidates;
    }

    // If price and scu are provided, calculate price/scu and select the best one
    let bestRoute: Route | null = null;
    let bestPricePerScu = Infinity;

    for (const route of candidates) {
        if (route.price != null && route.scu != null) {
            const pricePerScu = route.price / route.scu;

            if (pricePerScu < bestPricePerScu) {
                bestPricePerScu = pricePerScu;
                bestRoute = route;
            }
        }
    }

    return bestRoute ? [bestRoute] : candidates;
}

// TODO Write Tests


const TourWidget = () => {
    const [settings, setSettings] = useSettings()
    const [hRoutes, setHRoutes] = useHaulingRoutes()
    const [dHRoutes, setDHRoutes] = useDetailedHaulingRoutes()

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
        </>
    )
}

export default TourWidget