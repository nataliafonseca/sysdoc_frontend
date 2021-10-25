import {
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link as ChakraLink,
  SimpleGrid,
  Text,
  useBreakpointValue,
  useColorModeValue
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import Head from 'next/head';
import Link from 'next/link';
import router from 'next/router';
import {
  IoArrowBackOutline,
  IoBanOutline,
  IoCheckmarkOutline,
  IoTrashOutline
} from 'react-icons/io5';
import { toast } from 'react-toastify';
import { Header } from '../components/Header';
import { PermissionController } from '../components/PermissionController';
import { setupApiClient } from '../services/api';
import { withSSRAuth } from '../utils/withSSRAuth';

type User = {
  name: string;
  enrolment: string;
};

type Document = {
  id: string;
  pdf: string;
  description: string;
  hours: number;
  type: string;
  status: number;
  createdAt: Date;
  user_id: string;
  user: User;
};

type ViewProps = {
  document: Document;
};

export default function View({ document }: ViewProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  async function onApprove() {
    try {
      const api = setupApiClient();
      await api.patch('/documents/approve', { document_id: document.id });
      toast.success('Documento aprovado');
      router.push('/');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  async function onReject() {
    try {
      if (
        window.confirm(
          'Tem certeza que deseja reprovar esse documento? Essa ação é irreversível.'
        )
      ) {
        const api = setupApiClient();
        await api.patch('/documents/reject', { document_id: document.id });
        toast.success('Documento reprovado');
        router.push('/');
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  async function onDelete() {
    try {
      if (
        window.confirm(
          'Tem certeza que deseja deletar esse documento? Essa ação é irreversível.'
        )
      ) {
        const api = setupApiClient();
        await api.delete(`/documents/${document.id}`);
        toast.success('Documento removido com sucesso.');
        router.push('/');
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  return (
    <>
      <Head>
        <title>MagisterDoc | Documento</title>
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
        <Flex justify="space-between" mb="8">
          <Heading size="lg">Documento</Heading>
          <ButtonGroup
            ml={[0, 'auto']}
            flexDirection="row"
            spacing={['0.2rem', '0.5rem']}
          >
            <Link href="/" passHref>
              {isWideVersion ? (
                <Button
                  size="sm"
                  colorScheme="gray"
                  minW={['100%', '8rem']}
                  mb={['0.5rem', 0]}
                >
                  Voltar
                </Button>
              ) : (
                <IconButton
                  aria-label="Voltar"
                  size="sm"
                  icon={<Icon as={IoArrowBackOutline} fontSize="24" />}
                />
              )}
            </Link>
            <PermissionController roles={['admin']}>
              {isWideVersion ? (
                <Button
                  size="sm"
                  colorScheme="red"
                  minW={['100%', '8rem']}
                  onClick={onReject}
                  disabled={document.status !== 0}
                  mb={['0.5rem', 0]}
                >
                  Reprovar
                </Button>
              ) : (
                <IconButton
                  aria-label="Reprovar"
                  colorScheme="red"
                  size="sm"
                  onClick={onReject}
                  disabled={document.status !== 0}
                  icon={<Icon as={IoBanOutline} fontSize="24" />}
                />
              )}
              {isWideVersion ? (
                <Button
                  size="sm"
                  colorScheme="blue"
                  minW={['100%', '8rem']}
                  onClick={onApprove}
                  disabled={document.status !== 0}
                >
                  Aprovar
                </Button>
              ) : (
                <IconButton
                  aria-label="Aprovar"
                  colorScheme="blue"
                  size="sm"
                  onClick={onApprove}
                  disabled={document.status !== 0}
                  icon={<Icon as={IoCheckmarkOutline} fontSize="24" />}
                />
              )}
            </PermissionController>
            <PermissionController roles={['student']}>
              {isWideVersion ? (
                <Button
                  size="sm"
                  ml={[0, 'auto']}
                  colorScheme="red"
                  minW={['100%', '8rem']}
                  onClick={onDelete}
                  disabled={document.status !== 0}
                  mb={['0.5rem', 0]}
                >
                  Remover
                </Button>
              ) : (
                <IconButton
                  icon={<Icon as={IoTrashOutline} fontSize="xl" />}
                  onClick={onDelete}
                  disabled={document.status !== 0}
                  aria-label="Remover"
                  colorScheme="red"
                  size="sm"
                />
              )}
            </PermissionController>
          </ButtonGroup>
        </Flex>
        <Box w="100%">
          <SimpleGrid columns={[1, 3]} gap={['0.5rem', '1rem']} mb="2rem">
            <Box
              borderRadius="md"
              boxShadow="base"
              bg={useColorModeValue('gray.100', 'gray.700')}
              p="1rem"
            >
              <Text>
                <Heading size="sm" mb="0.5rem">
                  Descrição
                </Heading>
                {document.description}
              </Text>
            </Box>
            <Box
              borderRadius="md"
              boxShadow="base"
              bg={useColorModeValue('gray.100', 'gray.700')}
              p="1rem"
            >
              <Text>
                <Heading size="sm" mb="0.5rem">
                  Carga Horária
                </Heading>
                {document.hours}h
              </Text>
            </Box>
            <Box
              borderRadius="md"
              boxShadow="base"
              bg={useColorModeValue('gray.100', 'gray.700')}
              p="1rem"
            >
              <Heading size="sm" mb="0.5rem">
                Tipo
              </Heading>
              <Text>{document.type}</Text>
            </Box>
            <Box
              borderRadius="md"
              boxShadow="base"
              bg={useColorModeValue('gray.100', 'gray.700')}
              p="1rem"
            >
              <Heading size="sm" mb="0.5rem">
                Status
              </Heading>
              {document.status === 0 && <Text>Pendente</Text>}
              {document.status === 1 && <Text>Aprovado</Text>}
              {document.status === 2 && <Text>Reprovado</Text>}
            </Box>
            <Box
              borderRadius="md"
              boxShadow="base"
              bg={useColorModeValue('gray.100', 'gray.700')}
              p="1rem"
            >
              <Heading size="sm" mb="0.5rem">
                Criado em
              </Heading>
              <Text>
                {dayjs(document.createdAt).format('DD/MM/YYYY HH:mm')}
              </Text>
            </Box>
            <Box
              borderRadius="md"
              boxShadow="base"
              bg={useColorModeValue('gray.100', 'gray.700')}
              p="1rem"
            >
              <Heading size="sm" mb="0.5rem">
                Aluno
              </Heading>
              <Text>
                {document.user.name}
                <Text as="span" color="gray.300" fontSize="small">
                  {' '}
                  - {document.user.enrolment}
                </Text>
              </Text>
            </Box>
          </SimpleGrid>
          <Flex w="100%">
            <ChakraLink
              ml="auto"
              color={useColorModeValue('blue.500', 'blue.200')}
              as="a"
              target="_blank"
              href={document.pdf}
            >
              Abrir em nova aba
            </ChakraLink>
          </Flex>
          <AspectRatio mt="0.25rem" mb="1rem" w="100%">
            <iframe src={document.pdf} />
          </AspectRatio>
        </Box>
      </Flex>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const documentId = ctx.query.id;
  const api = setupApiClient(ctx);
  const response = await api.get(`/documents/${documentId}`);
  const document = response.data;

  return {
    props: { document }
  };
});
