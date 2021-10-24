import { Button } from '@chakra-ui/react';
import Head from 'next/head';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Login() {
  const { signOut } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>MagisterDoc | Dashboard</title>
      </Head>
      <Button onClick={signOut}>Logout</Button>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {}
  };
});
