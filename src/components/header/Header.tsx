import React from "react";
import { Box, Container, HStack, Link } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { HeaderMenu } from "..";

/**
 * ヘッダーを生成する関数
 * @returns Header Component
 */
const Header = (): JSX.Element => {
  const history = useHistory();
  return (
    <Box bg="#99CED4" h="16" as="header">
      <Container maxW="container.lg" h="100%">
        <HStack justify="space-between" h="100%">
          <Link
            href="/"
            fontSize="4xl"
            fontWeight="bold"
            color="gray.100"
            _hover={{ textDecoration: "none" }}
            onClick={() => {
              history.push("/");
            }}
          >
            BiFB
          </Link>
          <HeaderMenu />
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;
