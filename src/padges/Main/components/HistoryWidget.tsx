import { Badge } from '@mantine/core';

const HistoryWidget = () => {
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
        History
      </Badge>
    </>
  );
};

export default HistoryWidget;
