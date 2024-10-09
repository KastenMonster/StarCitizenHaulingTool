import { rem, Text } from '@mantine/core';

const Copyright = () => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 'var(--mantine-spacing-sm)',
      }}
    >
      <Text c={'dimmed'} size={rem(11)}>
        Made by KastenMonster
      </Text>
    </div>
  );
};

export default Copyright;
