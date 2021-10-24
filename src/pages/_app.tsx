import type { AppProps } from 'next/app';
import { Chakra } from '../components/ChakraWrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Chakra>
      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer autoClose={3000} />
      </AuthProvider>
    </Chakra>
  );
}
export default MyApp;
