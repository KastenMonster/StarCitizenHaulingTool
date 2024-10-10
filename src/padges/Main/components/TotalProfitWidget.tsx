import { Badge, Text } from '@mantine/core';
import { useTotalProfitValue } from '../../../store/totalProfit';

const HistoryWidget = () => {
  const total = useTotalProfitValue();

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
        Total Profit
      </Badge>
      <Text fw={'bold'}>{total.toLocaleString('de')} UEC</Text>
    </>
  );
};

export default HistoryWidget;
