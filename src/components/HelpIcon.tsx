import { ActionIcon, Modal, Tooltip } from '@mantine/core';
import { IconHelpCircle } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

const HelpIcon = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Tooltip position="right" label={'Help'}>
        <ActionIcon variant="subtle" color="gray" size={'md'} onClick={open}>
          <IconHelpCircle />
        </ActionIcon>
      </Tooltip>

      <Modal opened={opened} onClose={close} title={'How to use this tool?'}>
        You can add missions using the plus button or by pressing <kbd>CTRL</kbd> + <kbd>K</kbd>. The inputs follow an
        open format, allowing you to enter custom names for each in-game location. After submitting each route, the tool
        will display the optimal route. Once you've finished entering all routes, or if you're satisfied, you can start
        the mission. By clicking on the settings icon, you can adjust certain values to customize your preferences.
      </Modal>
    </>
  );
};

export default HelpIcon;
