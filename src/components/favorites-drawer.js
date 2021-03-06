import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Badge,
  Box,
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
} from "@chakra-ui/react";
import { Star } from "react-feather";

import FavoritesContext from "../context/favorites-context";
import { LaunchItem } from "./launches";
import { LaunchPadItem } from "./launch-pads";

export default function FavoritesDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { state } = React.useContext(FavoritesContext);
  const launchCount = state.favoriteLaunches?.length;
  const launchPadCount = state.favoriteLaunchPads?.length;

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        <Star style={{ marginRight: 5, fill: "yellow" }} />
        Favorites
        {launchCount + launchPadCount ? (
          <Badge
            variant="solid"
            position="absolute"
            top={-2}
            right={-2}
            height={5}
            paddingX="0.3rem"
            borderRadius="full"
            colorScheme="teal"
            fontSize="md"
          >
            {launchCount + launchPadCount}
          </Badge>
        ) : (
          ""
        )}
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
        scrollBehavior="inside"
        closeOnEsc={true}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              Your Favorites{" "}
              {launchCount + launchPadCount ? (
                <>({launchCount + launchPadCount})</>
              ) : (
                ""
              )}{" "}
            </DrawerHeader>
            <DrawerBody>
              {!launchCount && !launchPadCount ? (
                <Text>Stared Launches and Launch Pads will appear here</Text>
              ) : (
                <Accordion defaultIndex={[0]} allowToggle>
                  {launchCount ? (
                    <AccordionItem>
                      <h2>
                        <AccordionButton
                          _expanded={{ bg: "teal", color: "white" }}
                        >
                          <Box flex="1" textAlign="left">
                            Launches ({launchCount})
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        <SimpleGrid columns={1} spacing={10}>
                          {state.favoriteLaunches.map((launch) => (
                            <LaunchItem
                              launch={launch}
                              key={launch.flight_number + 1000}
                            />
                          ))}
                        </SimpleGrid>
                      </AccordionPanel>
                    </AccordionItem>
                  ) : (
                    ""
                  )}

                  {launchPadCount ? (
                    <AccordionItem>
                      <h2>
                        <AccordionButton
                          _expanded={{ bg: "teal", color: "white" }}
                        >
                          <Box flex="1" textAlign="left">
                            Launch Pads ({launchPadCount})
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        <SimpleGrid columns={1} spacing={10}>
                          {state.favoriteLaunchPads.map((launchPad) => (
                            <LaunchPadItem
                              launchPad={launchPad}
                              key={launchPad.id + 1000}
                            />
                          ))}
                        </SimpleGrid>
                      </AccordionPanel>
                    </AccordionItem>
                  ) : (
                    ""
                  )}
                </Accordion>
              )}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
