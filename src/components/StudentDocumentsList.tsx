import {
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import router from 'next/router';
import { IoSearch, IoTrashOutline } from 'react-icons/io5';
import { RiAddLine } from 'react-icons/ri';
import { useDocuments } from '../hooks/useDocuments';
import { api } from '../services/api';

export function StudentDocumentsList() {
  const { data, isLoading, isFetching, error, refetch } = useDocuments();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  async function onDelete(id: string) {
    await api.delete(`/documents/${id}`);
    refetch();
  }

  function onView(id: string) {
    router.push({ pathname: '/view', query: { id } });
  }

  return (
    <Flex
      width="100%"
      my="1.5rem"
      maxW="98%"
      w="1200px"
      mx="auto"
      px={['4', '6']}
      direction="column"
    >
      <Flex justify="space-between" mb="8">
        <Heading size="lg">
          Documentos
          {!isLoading && isFetching && (
            <Spinner size="sm" color="gray.500" ml="4" />
          )}
        </Heading>
        <Link href="/upload" passHref>
          <Button
            as="a"
            size="sm"
            fontSize="sm"
            colorScheme="blue"
            leftIcon={<Icon as={RiAddLine} />}
          >
            Adicionar
          </Button>
        </Link>
      </Flex>
      {isLoading ? (
        <Flex justify="center">
          <Spinner />
        </Flex>
      ) : error ? (
        <Flex justify="center">Falha ao obter dados.</Flex>
      ) : (
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Documento</Th>
              {isWideVersion && <Th>Carga Horária</Th>}
              {isWideVersion && <Th>Descrição</Th>}
              <Th>Status</Th>
              {isWideVersion && <Th>Criado em</Th>}
              <Th isNumeric></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((document) => (
              <Tr key={document.id}>
                <Td>
                  <Text fontWeight="bold">{document.type}</Text>
                </Td>
                {isWideVersion && <Td>{document.hours}</Td>}
                {isWideVersion && <Td>{document.description}</Td>}
                {document.status === 0 && <Td>Pendente</Td>}
                {document.status === 1 && <Td>Aprovado</Td>}
                {document.status === 2 && <Td>Reprovado</Td>}
                {isWideVersion && (
                  <Td>
                    {dayjs(document.createdAt).format('DD/MM/YYYY HH:mm')}
                  </Td>
                )}
                <Td isNumeric>
                  {isWideVersion ? (
                    <Stack direction="row" spacing="2">
                      <Button
                        colorScheme="gray"
                        onClick={() => {
                          onView(document.id);
                        }}
                        size="sm"
                      >
                        Visualizar
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          onDelete(document.id);
                        }}
                        size="sm"
                      >
                        Remover
                      </Button>
                    </Stack>
                  ) : (
                    <Stack direction="row" spacing="2">
                      <IconButton
                        icon={<Icon as={IoSearch} fontSize="xl" />}
                        onClick={() => {
                          onView(document.id);
                        }}
                        aria-label="Visualizar"
                        colorScheme="gray"
                        size="sm"
                      />
                      <IconButton
                        icon={<Icon as={IoTrashOutline} fontSize="xl" />}
                        onClick={() => {
                          onDelete(document.id);
                        }}
                        aria-label="Visualizar"
                        colorScheme="red"
                        size="sm"
                      />
                    </Stack>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Flex>
  );
}
