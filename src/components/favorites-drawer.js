import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  useDisclosure,
  SimpleGrid,
} from "@chakra-ui/core";
import { Star } from "react-feather";

import FavoritesContext from "../context/favorites-context";
import { LaunchItem } from "./launches";

export default function FavoritesDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { state } = React.useContext(FavoritesContext);
  const { favoriteLaunches, favoriteLaunchPads } = state;
  const count = favoriteLaunches.length + favoriteLaunchPads.length;

  return (
    <>
      <Button
        position="absolute"
        top={15}
        right={15}
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
      >
        <Star style={{ marginRight: 5, fill: "yellow" }} />
        Favorites
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
        scrollBehavior="inside"
        closeOnEsc={true}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Favorites</DrawerHeader>

            <DrawerBody>
              {!favoriteLaunches.length && !favoriteLaunchPads.length ? (
                <Text>
                  Your favorite Launches and Launch Pads will appear here
                </Text>
              ) : (
                <SimpleGrid columns={1} spacing={10}>
                  {favoriteLaunches.length
                    ? favoriteLaunches.map((launch) => (
                        <LaunchItem
                          launch={launch}
                          key={launch.flight_number}
                        />
                      ))
                    : undefined}
                </SimpleGrid>
              )}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
