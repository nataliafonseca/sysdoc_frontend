import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import { Header } from '../components/Header';
import { PermissionController } from '../components/PermissionController';
import { StudentDocumentsList } from '../components/StudentDocumentsList';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Login() {
  return (
    <>
      <Head>
        <title>MagisterDoc | Dashboard</title>
      </Head>
      <Flex direction="column" h="100vh">
        <Header />
        <PermissionController roles={['student']}>
          <StudentDocumentsList />
        </PermissionController>
      </Flex>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {}
  };
});
