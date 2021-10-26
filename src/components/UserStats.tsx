import { Box, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDocuments } from '../hooks/useDocuments';

type User = {
  role: string;
};

type UserStatsProps = {
  user: User;
  trigger: boolean;
};

export function UserStats({ user, trigger }: UserStatsProps) {
  const { data: approved } = useDocuments(0, 1, user.role);
  const { data: pending, refetch } = useDocuments(0, 0, user.role);

  useEffect(() => {
    refetch();
  }, [trigger]);

  const totalApproved = approved?.documents.reduce((acc, curr) => {
    return acc + curr.hours;
  }, 0);

  const totalPending = pending?.documents.reduce((acc, curr) => {
    return acc + curr.hours;
  }, 0);

  return (
    <>
      <Flex>
        <Stack
          spacing="1rem"
          minW={['100%', 0]}
          direction={['column', 'row']}
          ml="auto"
          mb="3rem"
        >
          <Box
            bg={useColorModeValue('gray.100', 'gray.700')}
            p="1rem"
            borderRadius="lg"
            boxShadow="base"
          >
            <Text fontSize="3rem" fontWeight="bold" textAlign="end">
              {totalApproved}{' '}
              <Text as="span" fontSize="1.3rem" fontWeight="normal">
                horas homologadas
              </Text>
            </Text>
          </Box>
          <Box
            bg={useColorModeValue('gray.100', 'gray.700')}
            p="1rem"
            borderRadius="lg"
            boxShadow="base"
          >
            <Text fontSize="3rem" fontWeight="bold" textAlign="end">
              {totalPending}{' '}
              <Text as="span" fontSize="1.3rem" fontWeight="normal">
                horas pendentes
              </Text>
            </Text>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
