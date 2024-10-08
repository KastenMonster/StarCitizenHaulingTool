import { useEffect, useRef } from 'react';
import classes from './Main.module.css';
import { useMediaQuery } from '@mantine/hooks';
import { ActionIcon, Badge, Button, Divider, em, Group, Kbd, rem, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

const Main = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  useEffect(() => {
    function handleCreateShortcut(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        console.log('Pressed');
      }
    }

    window.addEventListener('keydown', handleCreateShortcut);

    return () => {
      window.removeEventListener('keydown', handleCreateShortcut);
    };
  }, []);

  return (
    <main ref={mainRef} className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.widgetWrapper}>
          <div className={classes.widget}>
            <Badge
              color="gray"
              style={{
                position: 'absolute',
                top: 0,
                left: '10px',
                transform: 'translateY(-70%)',
              }}
            >
              Routes
            </Badge>
            <Tooltip label={'Create a new route'}>
              <Button fullWidth size="compact-md" color="blue" variant="light">
                <IconPlus />
              </Button>
            </Tooltip>
            <Divider my={'xs'} />
          </div>
        </div>
        <div className={classes.widgetWrapper}>
          <div className={classes.widget}></div>
          <div className={classes.widget}></div>
        </div>
        {isMobile && (
          <div className={classes.mobileCreateButton}>
            <Tooltip label="Create a new route">
              <ActionIcon radius={'xl'} size={rem(50)}>
                <IconPlus />
              </ActionIcon>
            </Tooltip>
          </div>
        )}
      </div>
    </main>
  );
};

export default Main;
