import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  useColorMode
} from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { IconType } from 'react-icons';
import { AiFillEye, AiOutlineEye } from 'react-icons/ai';

interface InputProps extends ChakraInputProps {
  id: string;
  label?: string;
  inputType: string;
  icon?: IconType;
  error?: FieldError;
  mask?: string;
  maskChar?: string | null;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { id, label, inputType, icon, error = null, ...rest },
  ref
) => {
  const [revealPassword, setRevealPassword] = useState(false);
  function toggleRevealPassword() {
    setRevealPassword(!revealPassword);
  }

  const { colorMode } = useColorMode();

  return (
    <FormControl id={id} isInvalid={!!error}>
      {label && (
        <FormLabel
          fontWeight="bold"
          color={colorMode === 'light' ? 'blue.500' : 'blue.200'}
        >
          {label}
        </FormLabel>
      )}
      <Flex
        flex="1"
        alignSelf="center"
        borderBottom="1px"
        p="1"
        fontSize="1rem"
        borderColor={colorMode === 'light' ? 'gray.400' : 'gray.300'}
      >
        {icon && (
          <Icon
            as={icon}
            fontSize="24px"
            color={colorMode === 'light' ? 'blue.500' : 'blue.200'}
          />
        )}
        <ChakraInput
          ml="2"
          variant="unstyled"
          ref={ref}
          type={
            // eslint-disable-next-line no-nested-ternary
            inputType === 'password'
              ? revealPassword
                ? 'text'
                : 'password'
              : inputType
          }
          {...rest}
        />
        {inputType === 'password' && (
          <IconButton
            icon={
              <Icon
                as={revealPassword ? AiFillEye : AiOutlineEye}
                fontSize="24"
                color={
                  revealPassword
                    ? colorMode === 'light'
                      ? 'blue.500'
                      : 'blue.200'
                    : colorMode === 'light'
                    ? 'gray.400'
                    : 'gray.300'
                }
              />
            }
            size="smaller"
            variant="unstyled"
            onClick={toggleRevealPassword}
            mr="2"
            aria-label="show password"
          />
        )}
      </Flex>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
