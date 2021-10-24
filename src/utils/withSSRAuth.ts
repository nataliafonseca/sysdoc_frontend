import decode from 'jwt-decode';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next';
import { parseCookies } from 'nookies';

type tokenData = {
  user: {
    id: string;
    name: string;
    enrolment: string;
    role: string;
  };
};

export function withSSRAuth<P>(
  fn: GetServerSideProps<P>,
  roles?: string[]
): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['magisterdoc.token'] as string;

    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      };
    }

    const { user } = decode(token) as tokenData;

    if (!(!roles || roles.includes(user.role))) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      };
    }

    return fn(ctx);
  };
}
