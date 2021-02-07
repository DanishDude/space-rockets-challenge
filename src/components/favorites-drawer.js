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
import { LaunchPadItem } from "./launch-pads";

export default function FavoritesDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { state } = React.useContext(FavoritesContext);
  const { favoriteLaunches, favoriteLaunchPads } = state;

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
                <Text>Stared Launches and Launch Pads will appear here</Text>
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

                  {favoriteLaunchPads.length
                    ? favoriteLaunchPads.map((launchPad) => (
                        <LaunchPadItem
                          launchPad={launchPad}
                          key={launchPad.id}
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
