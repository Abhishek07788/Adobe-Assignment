import React from "react";
import { Link } from "react-router-dom";

import { Box, Button, Image, SimpleGrid, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box
      display={["grid", "grid", "flex", "flex"]}
      w="100%"
      justifyContent="space-between"
      p="5px"
      pl={["2", "2", "10", "10"]}
      pr={["2", "2", "10", "10"]}
      alignItems="center"
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      top="0"
      position="fixed"
      bg="#ffff"
      zIndex={100}
    >
      <Link to="/">
        <Image
          w={["70px", "70px", "130px", "130px"]}
          h={["30px", "30px", "50px", "50px"]}
          m="auto"
          src={
            "https://www.adobe.com/content/dam/cc/icons/Adobe_Corporate_Horizontal_Red_HEX.svg"
          }
          alt="Logo"
        />
      </Link>
      <SimpleGrid
        columns={4}
        gap={10}
        display={["none", "none", "none", "flex"]}
        color="#ffff"
      >
        <Link to="/">
          <Button bg="black" _hover={{ bg: "grey" }}>
            User info
          </Button>
        </Link>
        <Link to="/post_form">
          <Button bg="black" _hover={{ bg: "grey" }}>
            Post info
          </Button>
        </Link>
        <Link to="/user_analytics">
          <Button colorScheme="red">User Analytics</Button>
        </Link>
        <Link to="/post_analytics">
          <Button colorScheme="red">Post Analytics</Button>
        </Link>
      </SimpleGrid>

      {/* ---------------------------------------- */}
      <Box gap={3} display={["flex", "flex", "flex", "none"]}>
        <Link to="/">
          <Text fontWeight={700}>
            <u>User Info</u>
          </Text>
        </Link>
        <Link to="/post_form">
          <Text fontWeight={700}>
            <u>Post Info</u>
          </Text>
        </Link>
        <Link to="/user_analytics">
          <Text color="red" fontWeight={700}>
            <u>UserAnalytics</u>
          </Text>
        </Link>
        <Link to="/post_analytics">
          <Text color="red" fontWeight={700}>
            <u>PostAnalytics</u>
          </Text>
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;
