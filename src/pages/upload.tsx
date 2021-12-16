import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosResponse } from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import router from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { api } from '../services/api';
import { withSSRAuth } from '../utils/withSSRAuth';

type Document = {
  id: string;
  description: string;
  hours: number;
  type: string;
  pdf: File;
  status: number;
  createdAt: string;
};

type DocumentFormData = {
  description: string;
  hours: number;
  type: string;
  fileList: FileList;
};

const documentFormSchema = yup.object({
  description: yup.string().required('O campo descrição é obrigatório.'),
  hours: yup
    .number()
    .required('O campo horas é obrigatório.')
    .typeError('O campo horas é obrigatório.'),
  type: yup.string().required('O campo tipo é obrigatório.'),
  fileList: yup
    .mixed()
    .required('O campo arquivo é obrigatório.')
    .test(
      'required',
      'O campo arquivo é obrigatório.',
      (fileList: FileList) => {
        return fileList.length > 0;
      }
    )
    .test(
      'fileSize',
      'O tamanho do arquivo não deve ser superior a 5MB.',
      (fileList: FileList) => {
        return fileList[0]?.size < 5000000;
      }
    )
    .test(
      'assurePDF',
      'O arquivo deve estar em formato PDF.',
      (fileList: FileList) => {
        return fileList[0]?.type === 'application/pdf';
      }
    )
});

export default function Upload() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(documentFormSchema),
    mode: 'onTouched'
  });

  const handleUpload: SubmitHandler<DocumentFormData> = async (
    values,
    event
  ) => {
    event?.preventDefault();
    const { description, hours, type, fileList } = values;

    try {
      const newDocument: AxiosResponse<Document> = await api.post(
        '/documents',
        {
          description,
          hours,
          type
        }
      );
      const formData = new FormData();
      formData.append('file', fileList[0]);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      await api.patch(
        `/documents/upload/${newDocument.data.id}`,
        formData,
        config
      );

      toast.success('Documento enviado com sucesso!');
      router.push('/');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <Head>
        <title>SysDoc | Envio de Documento</title>
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
          <Heading size="lg">Envio de Documento</Heading>
        </Flex>
        <Box w="100%" as="form" onSubmit={handleSubmit(handleUpload)}>
          <Stack spacing={['6', '8']}>
            <FormControl id="type">
              <FormLabel
                fontWeight="bold"
                color={useColorModeValue('blue.500', 'blue.200')}
              >
                TIPO
              </FormLabel>
              <Select
                variant="flushed"
                placeholder="Selecione o tipo"
                error={errors.type}
                {...register('type')}
              >
                <option value="Apresentação de Trabalho Cientifico">
                  Apresentação de Trabalho Cientifico
                </option>
                <option value="Congressos/Seminários/Simpósios/Jornadas/Cursos/Minicursos">
                  Congressos/Seminários/Simpósios/Jornadas/Cursos/Minicursos
                </option>
                <option value="Disciplinas Extracurriculares">
                  Disciplinas Extracurriculares
                </option>
                <option value="Iniciação Científica">
                  Iniciação Científica
                </option>
                <option value="Mentorias">Mentorias</option>
                <option value="Monitorias">Monitorias</option>
                <option value="Projetos e Programas de Extensão">
                  Projetos e Programas de Extensão
                </option>
                <option value="Projetos e Programas de Pesquisa">
                  Projetos e Programas de Pesquisa
                </option>
                <option value="Outros">Outros</option>
              </Select>
            </FormControl>
            <Input
              id="description"
              label="DESCRIÇÃO"
              inputType="text"
              placeholder="digite uma breve descrição do documento"
              error={errors.description}
              {...register('description')}
            />
            <Input
              as={InputMask}
              id="hours"
              label="HORAS"
              inputType="text"
              placeholder="digite a quantidade de horas"
              mask="999"
              maskChar={null}
              error={errors.hours}
              {...register('hours')}
            />
            <Input
              id="fileList"
              label="ARQUIVO"
              inputType="file"
              placeholder="anexe o documento em pdf"
              error={errors.fileList}
              {...register('fileList')}
            />
          </Stack>
          <ButtonGroup w="100%" mt="3rem" mb="2rem">
            <Link href="/" passHref>
              <Button
                as="a"
                colorScheme="gray"
                w={['calc(50% - 0.25rem)', '8rem']}
                ml="auto"
              >
                Cancelar
              </Button>
            </Link>
            <Button
              type="submit"
              isLoading={isSubmitting}
              colorScheme="blue"
              minW={['calc(50% - 0.25rem)', '8rem']}
            >
              Adicionar
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {}
  };
}, ['student']);
