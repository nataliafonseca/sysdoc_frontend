import {
  Flex,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import Link from 'next/link';
import { ColorModeToggle } from '../ColorModeToggle';
import { Profile } from './Profile';

export function Header() {
  const { colorMode } = useColorMode();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth="98%"
      width="1200px"
      h="4rem"
      mx="auto"
      my={4}
      borderRadius="xl"
      px="6"
      align="center"
      bg={useColorModeValue('gray.100', 'gray.700')}
    >
      <Link href="/" passHref>
        <Text
          as="a"
          fontSize={['2xl', '4xl']}
          fontFamily="quicksand"
          textAlign="center"
        >
          magister
          <Text
            as="span"
            color={colorMode === 'light' ? 'blue.500' : 'blue.200'}
          >
            doc
          </Text>
        </Text>
      </Link>

      <Flex align="center" ml="auto">
        <ColorModeToggle
          borderRightWidth="1px"
          borderColor="gray.200"
          pr={['1rem', '1.5rem']}
          mr={['1rem', '1.5rem']}
          borderRadius="0"
        />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
