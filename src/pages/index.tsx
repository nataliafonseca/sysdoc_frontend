import Head from 'next/head';
import { AdminDocumentsList } from '../components/AdminDocumentsList';
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
      <Header />
      <PermissionController roles={['student']}>
        <StudentDocumentsList />
      </PermissionController>
      <PermissionController roles={['admin']}>
        <AdminDocumentsList />
      </PermissionController>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {}
  };
});
