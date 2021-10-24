import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TiLockClosed, TiUser } from 'react-icons/ti';
import InputMask from 'react-input-mask';
import * as yup from 'yup';
import { ColorModeToggle } from '../components/ColorModeToggle';
import { Input } from '../components/Input';
import { AuthContext } from '../context/AuthContext';
import { withSSRGuest } from '../utils/withSSRGuest';

type LoginFormData = {
  enrolment: string;
  password: string;
};

const LoginFormSchema = yup.object({
  enrolment: yup.string().required('O campo matrícula é obrigatório.'),
  password: yup.string().required('O campo senha é obrigatório.')
});

export default function Login() {
  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({ resolver: yupResolver(LoginFormSchema) });

  const handleLogin: SubmitHandler<LoginFormData> = async (values, event) => {
    event?.preventDefault();
    await signIn(values);
  };

  return (
    <>
      <Head>
        <title>MagisterDoc | Login</title>
      </Head>
      <Flex w="100vw" h="100vh" direction="column">
        <Flex
          w="100vw"
          h="100vh"
          align="center"
          justify="center"
          direction="column"
          mb="50px"
        >
          <Flex
            as="form"
            w="100%"
            maxW="360px"
            p="8"
            border={['0px', '1px']}
            borderColor={[
              'transparent',
              useColorModeValue('gray.200', 'gray.500')
            ]}
            boxShadow={['none', 'base']}
            borderRadius="xl"
            flexDir="column"
            onSubmit={handleSubmit(handleLogin)}
          >
            <Heading
              fontSize="4xl"
              fontFamily="quicksand"
              textAlign="center"
              mb="3rem"
            >
              magister
              <Text as="span" color={useColorModeValue('blue.500', 'blue.200')}>
                doc
              </Text>
            </Heading>
            <Stack spacing={6}>
              <Input
                as={InputMask}
                id="enrolment"
                label="MATRICULA"
                inputType="text"
                mask="9999999999"
                maskChar={null}
                icon={TiUser}
                placeholder="digite sua matricula"
                error={errors.enrolment}
                {...register('enrolment')}
              />
              <Input
                id="password"
                label="SENHA"
                inputType="password"
                icon={TiLockClosed}
                placeholder="digite sua senha"
                error={errors.password}
                {...register('password')}
              />
            </Stack>
            <Button
              type="submit"
              mt="16"
              size="lg"
              colorScheme="blue"
              isLoading={isSubmitting}
            >
              Entrar
            </Button>
          </Flex>
        </Flex>
        <ColorModeToggle mt="auto" ml="auto" m="4" />
      </Flex>
    </>
  );
}

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {}
  };
});
