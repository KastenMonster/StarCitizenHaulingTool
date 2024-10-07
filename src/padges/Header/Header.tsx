import { ActionIcon, Button, Group, Modal, Title, Tooltip } from '@mantine/core';
import classes from './Header.module.css';
import { IconHelpCircle, IconSettings } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import HelpIcon from '../../components/HelpIcon';

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <Group justify="space-between">
          <HelpIcon />
          <Title order={3}>Star Citizen Hauling Tool</Title>
          <Tooltip withArrow position="left" label={'Settings'}>
            <ActionIcon variant="subtle" color="gray" size={'md'}>
              <IconSettings />
            </ActionIcon>
          </Tooltip>
        </Group>
      </header>
    </>
  );
};

export default Header;
