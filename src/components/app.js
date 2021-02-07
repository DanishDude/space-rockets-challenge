import React from "react";
import { Routes, Route } from "react-router-dom";
import { Button, Flex, Text } from "@chakra-ui/core";

import Launches from "./launches";
import Launch from "./launch";
import Home from "./home";
import LaunchPads from "./launch-pads";
import LaunchPad from "./launch-pad";
import FavoritesContext from "../context/favorites-context";
import FavoritesDrawer from "./favorites-drawer";

export default function App() {
  const { state } = React.useContext(FavoritesContext);
  return (
    <div>
      <NavBar />
      <Button
        style={{ position: "absolute", top: 15, right: 270 }}
        onClick={() => localStorage.clear()}
      >
        Clear LS
      </Button>
      <Button
        style={{ position: "absolute", top: 15, right: 155 }}
        onClick={() => console.log(state)}
      >
        Log State
      </Button>
      <FavoritesDrawer />
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
  return (
    <Flex
      as="nav"
      position="relative"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
    >
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
