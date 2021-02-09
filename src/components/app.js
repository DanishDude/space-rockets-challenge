import React from "react";
import { Routes, Route } from "react-router-dom";
import { Flex, SimpleGrid, Text, useColorMode } from "@chakra-ui/react";

import ColorMode from "./color-mode";
import FavoritesDrawer from "./favorites-drawer";
import Home from "./home";
import Launch from "./launch";
import Launches from "./launches";
import LaunchPad from "./launch-pad";
import LaunchPads from "./launch-pads";

export default function App() {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<Launches />} />
        <Route path="/launches/:launchId" element={<Launch />} />
        <Route path="/launch-pads" element={<LaunchPads />} />
        <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
      </Routes>
    </div>
  );
}

function NavBar() {
  const { colorMode } = useColorMode();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg={colorMode === "light" ? "gray.800" : "gray.900"}
      color="white"
    >
      <SimpleGrid
        pos="absolute"
        top={4}
        right={6}
        d="flex"
        spacing={4}
        color={colorMode === "light" ? "blackAlpha.900" : ""}
      >
        <ColorMode />
        <FavoritesDrawer />
      </SimpleGrid>
      <Text
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="lg"
      >
        ¡SPACE·R0CKETS!
      </Text>
    </Flex>
  );
}
