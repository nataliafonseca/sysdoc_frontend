import {
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link as ChakraLink,
  Link,
  Select,
  Spinner,
  Stack,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useColorModeValue
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import Head from 'next/head';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { BiFilterAlt } from 'react-icons/bi';
import { IoSearch, IoTrashOutline } from 'react-icons/io5';
import { RiAddLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { Header } from '../components/Header';
import { Pagination } from '../components/Pagination';
import { PermissionController } from '../components/PermissionController';
import { UserStats } from '../components/UserStats';
import { useDocuments } from '../hooks/useDocuments';
import { api, setupApiClient } from '../services/api';
import { withSSRAuth } from '../utils/withSSRAuth';

type User = {
  id: string;
  enrolment: string;
  name: string;
  role: string;
};

type IndexPageProps = {
  user: User;
};

export default function Index({ user }: IndexPageProps) {
  const [triggerStatsUpload, SetTriggerStatsUpload] = useState(false);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState(3);
  const { data, isLoading, isFetching, error, refetch } = useDocuments(
    page,
    statusFilter,
    user.role
  );

  useEffect(() => {
    refetch();
  }, []);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  async function onDelete(id: string) {
    try {
      if (
        window.confirm(
          'Tem certeza que deseja deletar esse documento? Essa ação é irreversível.'
        )
      ) {
        await api.delete(`/documents/${id}`);
        toast.success('Documento removido com sucesso.');
        refetch();
        SetTriggerStatsUpload(!triggerStatsUpload);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  function onView(id: string) {
    router.push({ pathname: '/view', query: { id } });
  }

  return (
    <>
      <Head>
        <title>MagisterDoc</title>
      </Head>
      <Header />
      <Flex
        width="100%"
        my="1.5rem"
        maxW="98%"
        w="1200px"
        mx="auto"
        px={['4', '6']}
        direction="column"
      >
        <PermissionController roles={['student']}>
          <UserStats user={user} trigger={triggerStatsUpload} />
        </PermissionController>
        <Flex mb="8">
          <Heading size="lg">
            Documentos
            {!isLoading && isFetching && (
              <Spinner size="sm" color="gray.500" ml="4" />
            )}
          </Heading>

          <Flex
            flex="1"
            alignSelf="center"
            borderRadius="md"
            bg={useColorModeValue('gray.100', 'gray.700')}
            py="0.25rem"
            pl="0.25rem"
            fontSize="1rem"
            maxW="8.5rem"
            borderColor={useColorModeValue('gray.400', 'gray.300')}
            ml="auto"
            align="center"
          >
            <Icon as={BiFilterAlt} fontSize="20px" mr="0.25rem" />
            <Select
              id="filter"
              size="sm"
              variant="unstyled"
              onChange={(e) => {
                console.log(e.target.value);
                setStatusFilter(Number(e.target.value));
              }}
            >
              <option value="3">Todas</option>
              <option value="0">Pendentes</option>
              <option value="1">Aprovadas</option>
              <option value="2">Reprovadas</option>
            </Select>
          </Flex>
          <PermissionController roles={['student']}>
            <Link href="/upload" passHref>
              {isWideVersion ? (
                <Button
                  ml="1rem"
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="blue"
                  leftIcon={<Icon as={RiAddLine} />}
                >
                  Adicionar
                </Button>
              ) : (
                <IconButton
                  ml="0.25rem"
                  icon={<Icon as={RiAddLine} fontSize="xl" />}
                  aria-label="Remover"
                  colorScheme="blue"
                  size="sm"
                />
              )}
            </Link>
          </PermissionController>
        </Flex>
        {isLoading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ) : error ? (
          <Flex justify="center">Falha ao obter dados.</Flex>
        ) : (
          <>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Documento</Th>
                  {isWideVersion && <Th>Tipo</Th>}
                  {isWideVersion && <Th>Horas</Th>}
                  <PermissionController roles={['admin']}>
                    {isWideVersion && <Th>Aluno</Th>}
                  </PermissionController>
                  {isWideVersion && <Th>Criado em</Th>}
                  <Th>Status</Th>
                  <Th isNumeric></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.documents.map((document) => (
                  <Tr key={document.id}>
                    <Td>
                      <ChakraLink href={document.pdf} target="_blank">
                        {document.description}
                      </ChakraLink>
                    </Td>
                    {isWideVersion && <Td>{document.type}</Td>}
                    {isWideVersion && <Td>{document.hours}h</Td>}
                    <PermissionController roles={['admin']}>
                      {isWideVersion && <Td>{document.user.name}</Td>}
                    </PermissionController>
                    {isWideVersion && (
                      <Td>
                        {dayjs(document.createdAt).format('DD/MM/YYYY HH:mm')}
                      </Td>
                    )}
                    {document.status === 0 && (
                      <Td>
                        <Tag variant="subtle" minW="5.2rem">
                          <Text mx="auto">Pendente</Text>
                        </Tag>
                      </Td>
                    )}
                    {document.status === 1 && (
                      <Td>
                        <Tag variant="subtle" colorScheme="green" minW="5.2rem">
                          <Text mx="auto">Aprovado</Text>
                        </Tag>
                      </Td>
                    )}
                    {document.status === 2 && (
                      <Td>
                        <Tag variant="subtle" colorScheme="red" minW="5.2rem">
                          <Text mx="auto">Reprovado</Text>
                        </Tag>
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
                          <PermissionController roles={['student']}>
                            <Button
                              colorScheme="red"
                              disabled={document.status !== 0}
                              onClick={() => {
                                onDelete(document.id);
                              }}
                              size="sm"
                            >
                              Remover
                            </Button>
                          </PermissionController>
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
                          <PermissionController roles={['student']}>
                            <IconButton
                              icon={<Icon as={IoTrashOutline} fontSize="xl" />}
                              disabled={document.status !== 0}
                              onClick={() => {
                                onDelete(document.id);
                              }}
                              aria-label="Remover"
                              colorScheme="red"
                              size="sm"
                            />
                          </PermissionController>
                        </Stack>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <Pagination
              totalCountOfRegisters={data?.totalCount || 0}
              currentPage={page}
              onPageChange={setPage}
            />
          </>
        )}
      </Flex>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const api = setupApiClient(ctx);
  const response = await api.get(`/profile`);
  const user = response.data;

  return {
    props: { user }
  };
});
