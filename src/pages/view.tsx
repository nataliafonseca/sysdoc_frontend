import {
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Link as ChakraLink,
  SimpleGrid,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import Head from 'next/head';
import Link from 'next/link';
import router from 'next/router';
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

  return (
    <>
      <Head>
        <title>MagisterDoc | Dashboard</title>
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
        </Flex>
        <Box w="100%">
          <SimpleGrid columns={[1, 6]} gap={['0.5rem', '1rem']} mb="2rem">
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
              <Text>{document.user.name}</Text>
              <Text color="gray.300" fontSize="small">
                {document.user.enrolment}
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
          <Flex w="100%" direction={['column', 'row']}>
            <Link href="/" passHref>
              <Button
                colorScheme="gray"
                minW={['100%', '8rem']}
                mb={['0.5rem', 0]}
              >
                Voltar
              </Button>
            </Link>
            <PermissionController roles={['admin']}>
              <ButtonGroup
                ml={[0, 'auto']}
                flexDirection={['column', 'row']}
                spacing={[0, '0.5rem']}
              >
                <Button
                  colorScheme="red"
                  minW={['100%', '8rem']}
                  onClick={onReject}
                  disabled={document.status !== 0}
                  mb={['0.5rem', 0]}
                >
                  Reprovar
                </Button>
                <Button
                  colorScheme="blue"
                  minW={['100%', '8rem']}
                  onClick={onApprove}
                  disabled={document.status !== 0}
                >
                  Aprovar
                </Button>
              </ButtonGroup>
            </PermissionController>
          </Flex>
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
