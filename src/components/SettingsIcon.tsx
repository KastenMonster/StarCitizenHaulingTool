import { ActionIcon, Drawer, em, Tooltip } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconSettings } from '@tabler/icons-react';

const SettingsIcon = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  console.log(em(750));

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title={'Settings'}
        position="right"
        size={isMobile ? '95%' : 'md'}
      ></Drawer>
      <Tooltip position="left" label={'Settings'}>
        <ActionIcon variant="subtle" color={isMobile ? 'cyan' : 'gray'} size={'md'} onClick={open}>
          <IconSettings />
        </ActionIcon>
      </Tooltip>
    </>
  );
};

export default SettingsIcon;
