import { Group, Title } from '@mantine/core';
import classes from './Header.module.css';
import HelpIcon from '../../components/HelpIcon';
import SettingsIcon from '../../components/SettingsIcon';

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <Group justify="space-between">
          <HelpIcon />
          <Title order={3}>Star Citizen Hauling Tool</Title>
          <SettingsIcon />
        </Group>
      </header>
    </>
  );
};

export default Header;
