import { Button, useColorMode } from '@chakra-ui/react';

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (pahe: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange
}: PaginationItemProps) {
  const { colorMode } = useColorMode();

  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="blue"
        disabled
        _disabled={{
          bgColor: colorMode === 'light' ? 'blue.500' : 'blue.200',
          cursor: 'default'
        }}
      >
        {number}
      </Button>
    );
  } else {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
        _hover={{ bg: colorMode === 'light' ? 'gray.300' : 'gray.500' }}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Button>
    );
  }
}
