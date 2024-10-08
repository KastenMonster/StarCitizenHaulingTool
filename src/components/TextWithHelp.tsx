import { em, Flex, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconHelpCircle } from '@tabler/icons-react';
import { ReactNode, useState } from 'react';

interface TextWithHelp {
  label: string;
  helpText: string | ReactNode;
  multiline?: boolean | undefined;
  w?: number | undefined;
}

const TextWithHelp = (props: TextWithHelp) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const [open, setOpen] = useState(false);

  return (
    <Flex align={'center'} gap={'xs'}>
      <Text>{props.label}</Text>
      <Tooltip opened={isMobile ? open : undefined} multiline={props.multiline} w={props.w} label={props.helpText}>
        <ThemeIcon
          variant="transparent"
          color="gray.8"
          style={{ cursor: 'pointer' }}
          onClick={() => isMobile && setOpen(!open)}
        >
          <IconHelpCircle />
        </ThemeIcon>
      </Tooltip>
    </Flex>
  );
};

export default TextWithHelp;
