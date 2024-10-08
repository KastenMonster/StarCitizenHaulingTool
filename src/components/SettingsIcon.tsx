import { ActionIcon, Drawer, em, Group, NumberInput, Stack, Switch, Text, Title, Tooltip } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconSettings } from '@tabler/icons-react';
import { useSettings } from '../store/settings';
import TextWithHelp from './TextWithHelp';

const SettingsIcon = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const [settings, setSettings] = useSettings();

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title={<Title order={2}>Settings</Title>}
        position="right"
        size={isMobile ? '70%' : 'md'}
      >
        <Stack gap={'md'}>
          <Group justify="space-between">
            <TextWithHelp
              label="Quick Mode"
              w={250}
              multiline
              helpText={
                <>
                  <Text size="sm">Enable quick mode for minimal input</Text>
                  <Text fs={'italic'} size="sm" c={'dimmed'}>
                    Disclaimer: The tool will therefore only provide you with route that as the most matches
                  </Text>
                </>
              }
            />
            <Switch checked={settings.quickMode} onChange={(e) => setSettings('quickMode', e.currentTarget.checked)} />
          </Group>
          <Group justify="space-between" gap={'lg'} grow>
            <TextWithHelp
              label="Ship SCU"
              helpText={
                <>
                  <Text size="sm">Maxium SCU your ship has</Text>
                  <Text fs={'italic'} size="sm" c={'dimmed'}>
                    Disclaimer: Quick Mode needs to be disabled
                  </Text>
                </>
              }
            />
            <NumberInput
              min={1}
              placeholder="96"
              disabled={settings.quickMode}
              value={settings.scu}
              onChange={(value) => setSettings('scu', Number(value))}
            />
          </Group>
        </Stack>
      </Drawer>
      <Tooltip position="left" label={'Settings'}>
        <ActionIcon variant="subtle" color={isMobile ? 'cyan' : 'gray'} size={'md'} onClick={open}>
          <IconSettings />
        </ActionIcon>
      </Tooltip>
    </>
  );
};

export default SettingsIcon;
