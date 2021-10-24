import { Box, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { AuthContext } from '../../context/AuthContext';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user, signOut } = useContext(AuthContext);

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{user?.name}</Text>
          <Text color="gray.300" fontSize="small">
            {user?.enrolment}
          </Text>
        </Box>
      )}

      <IconButton
        aria-label="logout"
        icon={<Icon as={RiLogoutCircleRLine} fontSize="24" onClick={signOut} />}
        variant="unstyled"
        size="sm"
      />
    </Flex>
  );
}
