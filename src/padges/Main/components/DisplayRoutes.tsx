import { ActionIcon, Badge, Divider, Flex, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { useDetailedHaulingRoutes, useHaulingRoutes } from '../../../store/haulingRoutes';
import { useSettingsValue } from '../../../store/settings';
import classes from '../Main.module.css';
import { IconArrowBarToDown, IconArrowBarUp, IconCircleMinus } from '@tabler/icons-react';
import { randomId } from '@mantine/hooks';

const DisplayRoutes = () => {
  const [hRoutes, sethRoutes] = useHaulingRoutes();
  const [dHRoutes, setDHRoutes] = useDetailedHaulingRoutes();
  const settings = useSettingsValue();

  return (
    <div className={classes.routeWrapper}>
      {((settings.quickMode && hRoutes.length <= 0) || (!settings.quickMode && dHRoutes.length <= 0)) && (
        <Text c={'dimmed'} size="sm" ta={'center'}>
          It's kinda empty in here
        </Text>
      )}
      {settings.quickMode
        ? hRoutes.map((route, index) => (
            <Route
              key={'route-' + index}
              onRemove={() => {
                let tmp = [...hRoutes];
                tmp.splice(index, 1);
                sethRoutes(tmp);
              }}
              {...route}
            />
          ))
        : dHRoutes.map((route, index) => (
            <Route
              key={'route-detailed-' + index}
              onRemove={() => {
                let tmp = [...dHRoutes];
                tmp.splice(index, 1);
                setDHRoutes(tmp);
              }}
              {...route}
            />
          ))}
    </div>
  );
};

interface Route {
  onRemove?: () => void;
  origin: string[];
  destination: string[];
  price?: number;
  scu?: number;
  duplicates?: number;
}
export const Route = (props: Route) => {
  return (
    <div className={classes.routeContainer}>
      <div style={{ flex: 1 }}>
        {props.origin.map((item, index) => (
          <Flex key={randomId()} direction={'row'} align={'center'}>
            <ThemeIcon color="gray.8" size={'sm'} variant="subtle">
              <IconArrowBarToDown />
            </ThemeIcon>
            <Text size="xs" c={'dimmed'}>
              {item}
            </Text>
          </Flex>
        ))}
        <Divider my={'xs'} variant="dashed" />
        {props.destination.map((item, index) => (
          <Flex key={randomId()} direction={'row'} align={'center'}>
            <ThemeIcon color="gray.8" size={'sm'} variant="subtle">
              <IconArrowBarUp />
            </ThemeIcon>
            <Text size="xs" c={'dimmed'}>
              {item}
            </Text>
          </Flex>
        ))}
      </div>
      {props.price && props.scu && (
        <Flex h={'100%'} gap={'xs'} direction={'column'} align={'flex-start'} justify={'center'}>
          <Badge color="blue" variant="light">
            {props.price}k
          </Badge>
          <Badge color="yellow" variant="light">
            {props.scu} SCU
          </Badge>
        </Flex>
      )}
      {props.onRemove && (
        <Tooltip label="Remove">
          <ActionIcon color="red" variant="subtle" onClick={props.onRemove}>
            <IconCircleMinus />
          </ActionIcon>
        </Tooltip>
      )}
      {props.duplicates && props.duplicates > 1 && (
        <Text right={10} top={3} pos={'absolute'} c={'dimmed'} size="sm">
          +{props.duplicates}
        </Text>
      )}
    </div>
  );
};

export default DisplayRoutes;
