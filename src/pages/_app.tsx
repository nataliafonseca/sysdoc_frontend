import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Chakra } from '../components/ChakraWrapper';
import { AuthProvider } from '../context/AuthContext';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Chakra>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
          <ToastContainer autoClose={3000} />
        </AuthProvider>
      </QueryClientProvider>
    </Chakra>
  );
}
export default MyApp;
export { getServerSideProps } from '../components/ChakraWrapper';
