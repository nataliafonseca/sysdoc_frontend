import { Text } from '@chakra-ui/react';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { Header } from '../components/Header';
import { api } from '../services/api';
import { withSSRAuth } from '../utils/withSSRAuth';

type Document = {
  id: string;
  pdf: string;
  description: string;
  hours: number;
  type: string;
  status: number;
  createdAt: Date;
  user_id: string;
};

type ViewProps = {
  document: Document;
};

export default function View({ document }: ViewProps) {
  return (
    <>
      <Head>
        <title>MagisterDoc | Dashboard</title>
      </Head>
      <Header />
      <Text>{document.type}</Text>
      <Text>{document.pdf}</Text>
      <Text>{document.hours}</Text>
      <Text>{document.status}</Text>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const documentId = ctx.query.id;
  const cookies = parseCookies(ctx);
  const response = await api.get(`/documents/${documentId}`, {
    headers: {
      Authorization: `Bearer ${cookies['magisterdoc.token']}`
    }
  });
  const document = response.data;

  return {
    props: { document }
  };
});
