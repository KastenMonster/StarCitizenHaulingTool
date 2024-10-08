import { ActionIcon, Badge, Button, Divider, em, Modal, Portal, rem, Stack, Text, Tooltip } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useEffect } from 'react';
import classes from '../Main.module.css';
import CreateRouteModal from './CreateRouteModal';
import DisplayRoutes from './DisplayRoutes';

const CreateRouteWidget = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  useEffect(() => {
    function handleCreateShortcut(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        open();
      }
    }

    window.addEventListener('keydown', handleCreateShortcut);
    return () => {
      window.removeEventListener('keydown', handleCreateShortcut);
    };
  }, []);

  return (
    <>
      <CreateRouteModal opened={opened} close={close} />
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
      <Tooltip
        label={
          <>
            <Text size="sm">Create a new route</Text>
            <Text fs={'italic'} c={'dimmed'}>
              STRG + K
            </Text>
          </>
        }
      >
        <Button onClick={open} fullWidth size="compact-md" color="blue" variant="light">
          <IconPlus />
        </Button>
      </Tooltip>
      <Divider my={'xs'} />
      <DisplayRoutes />
      {isMobile && (
        <Portal>
          <div className={classes.mobileCreateButton}>
            <Tooltip label="Create a new route">
              <ActionIcon onClick={open} radius={'xl'} size={rem(50)}>
                <IconPlus />
              </ActionIcon>
            </Tooltip>
          </div>
        </Portal>
      )}
    </>
  );
};

export default CreateRouteWidget;
