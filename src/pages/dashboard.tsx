import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import { Header } from '../components/Header';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Login() {
  return (
    <>
      <Head>
        <title>MagisterDoc | Dashboard</title>
      </Head>
      <Flex direction="column" h="100vh">
        <Header />
      </Flex>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {}
  };
});
