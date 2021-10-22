import type { AppProps } from 'next/app';
import { Chakra } from '../components/ChakraWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Chakra>
      <Component {...pageProps} />
    </Chakra>
  );
}
export default MyApp;
