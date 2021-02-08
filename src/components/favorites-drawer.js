import React from "react";
import {
  Badge,
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
        onClick={() => {
          console.log(favoriteLaunches.length + favoriteLaunchPads.length);
          onOpen();
        }}
      >
        <Star style={{ marginRight: 5, fill: "yellow" }} />
        Favorites
        <Badge
          borderRadius="full"
          variant="solid"
          position="absolute"
          top={-8}
          right={-8}
          height={4}
        >
          {favoriteLaunches.length + favoriteLaunchPads.length}
        </Badge>
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
            {!favoriteLaunches.length && !favoriteLaunchPads.length ? (
              <Text>Stared Launches and Launch Pads will appear here</Text>
            ) : (
              <>
                {favoriteLaunches.length ? (
                  <>
                    <DrawerHeader>
                      Launches ({favoriteLaunches.length})
                    </DrawerHeader>

                    <DrawerBody>
                      <SimpleGrid columns={1} spacing={10}>
                        {favoriteLaunches.map((launch) => (
                          <LaunchItem
                            launch={launch}
                            key={launch.flight_number}
                          />
                        ))}
                      </SimpleGrid>
                    </DrawerBody>
                  </>
                ) : (
                  ""
                )}

                {favoriteLaunchPads.length ? (
                  <>
                    <DrawerHeader>
                      Launch Pads ({favoriteLaunchPads.length})
                    </DrawerHeader>

                    <DrawerBody>
                      <SimpleGrid columns={1} spacing={10}>
                        {favoriteLaunchPads.map((launchPad) => (
                          <LaunchPadItem
                            launchPad={launchPad}
                            key={launchPad.id}
                          />
                        ))}
                      </SimpleGrid>
                    </DrawerBody>
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
