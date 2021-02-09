import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { Moon, Sun } from "react-feather";

export default function ColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      icon={colorMode === "light" ? <Moon /> : <Sun />}
      onClick={toggleColorMode}
    >
      Toggle {colorMode === "light" ? "Dark" : "Light"}
    </IconButton>
  );
}
