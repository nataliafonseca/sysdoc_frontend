import { Box, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

type Document = {
  id: string;
  pdf: string;
  description: string;
  hours: number;
  type: string;
  status: number;
  createdAt: Date;
  user_id: string;
};

export function UserStats() {
  const [approvedDocuments, setApprovedDocuments] = useState([] as Document[]);
  const [pendingDocuments, setPendingDocuments] = useState([] as Document[]);

  useEffect(() => {
    async function getUserDocuments() {
      const pending: AxiosResponse<Document[]> = await api.get(
        '/documents/user?page=all&status=0'
      );
      const approved: AxiosResponse<Document[]> = await api.get(
        '/documents/user?page=all&status=1'
      );

      setPendingDocuments(pending.data);
      setApprovedDocuments(approved.data);
    }

    getUserDocuments();
  }, []);

  const totalApproved = approvedDocuments.reduce((acc, curr) => {
    return acc + curr.hours;
  }, 0);

  const totalPending = pendingDocuments.reduce((acc, curr) => {
    return acc + curr.hours;
  }, 0);

  return (
    <>
      <Flex>
        <Stack spacing="1rem" direction="row" ml="auto" mb="3rem">
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
