import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Switch,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Header() {
  const { toggleColorMode } = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Box as="nav" padding={6} bg="teal.500" color="white" w={"100wh"}>
      <Container maxW={"container.lg"}>
        <Flex align={"center"} justify={"space-between"} wrap={"wrap"}>
          <Flex align="center" mr={5}>
            <Heading as="h1" size="lg" letterSpacing={"tighter"}>
              Chakra UI
            </Heading>
          </Flex>

          <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
            <HamburgerIcon />
          </Box>

          <Stack
            direction={{ base: "column", md: "row" }}
            display={{ base: isOpen ? "block" : "none", md: "flex" }}
            width={{ base: "full", md: "auto" }}
            alignItems="center"
            flexGrow={1}
            mt={{ base: 4, md: 0 }}
          >
            <Text>Docs</Text>
            <Text>Examples</Text>
            <Text>Blog</Text>
          </Stack>

          <Box
            display={{ base: isOpen ? "block" : "none", md: "block" }}
            mt={{ base: 4, md: 0 }}
          >
            <Button
              variant="outline"
              _hover={{ bg: "teal.700", borderColor: "teal.700" }}
            >
              Create account
            </Button>
            <Switch
              variant="outline"
              mx={3}
              colorScheme="telegram"
              onChange={toggleColorMode}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
