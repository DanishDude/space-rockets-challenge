import React from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { format as timeAgo } from "timeago.js";
import { Link } from "react-router-dom";

import { useSpaceXPaginated } from "../utils/use-space-x";
import { formatDate } from "../utils/format-date";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LikeIcon from "./like-icon";
import LoadMoreButton from "./load-more-button";
import FavoritesContext from "../context/favorites-context";

const PAGE_SIZE = 12;

export default function Launches() {
  const [options, setOptions] = React.useState({});
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
      ...options,
    }
  );

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
      />
      <LaunchSearch setOptions={(opts) => setOptions(opts)} />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch) => (
              <LaunchItem launch={launch} key={launch.flight_number} />
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}

function LaunchSearch({ setOptions }) {
  const [query, setQuery] = React.useState({});
  const minDate = "2006-01-01";
  const maxDate = () => {
    let d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  };

  function handleSelect(key, value) {
    value === "All"
      ? setQuery({ ...query, key: "" })
      : setQuery({ ...query, [key]: value });
  }

  return (
    <Box>
      <Heading m={4} textAlign="center" fontFamily="mono">
        Search Past Launches
      </Heading>
      <Wrap marginX={6} justify="center">
        <WrapItem m={3}>
          <FormControl>
            <FormLabel>From</FormLabel>
            <Input
              w={180}
              type="date"
              min={minDate}
              max={maxDate()}
              onChange={(e) =>
                setQuery({ end: maxDate(), ...query, start: e.target.value })
              }
            />
          </FormControl>
        </WrapItem>
        <WrapItem m={3}>
          <FormControl>
            <FormLabel>To</FormLabel>
            <Input
              w={180}
              type="date"
              min={minDate}
              max={maxDate()}
              onChange={(e) =>
                setQuery({ start: minDate, ...query, end: e.target.value })
              }
            />
          </FormControl>
        </WrapItem>
        <WrapItem m={3}>
          <FormControl>
            <FormLabel>Launch Site</FormLabel>
            <Select
              w={360}
              defaultValue="All"
              onChange={(e) => handleSelect("site_name", e.target.value)}
            >
              <option value="All">All</option>
              <option value="CCAFS SLC 40">
                Cape Canaveral (CCAFS SLC 40)
              </option>
              <option value="KSC LC 39A">
                Kennedy Space Center (KSC LC 39A)
              </option>
              <option value="Kwajalein Atoll">
                Kwajalein Atoll Omelek Island
              </option>
              <option value="VAFB SLC 4E">
                Vandenberg Complex 4E (VAFB SLC 4E)
              </option>
            </Select>
          </FormControl>
        </WrapItem>
        <WrapItem m={3}>
          <FormControl>
            <FormLabel>Rocket</FormLabel>
            <Select
              w={250}
              defaultValue="All"
              onChange={(e) => handleSelect("rocket_name", e.target.value)}
            >
              <option value="All">All</option>
              <option value="Falcon 1">Falcon 1</option>
              <option value="Falcon 9">Falcon 9</option>
              <option value="Falcon Heavy">Falcon Heavy</option>
              <option value="Starship">Starship</option>
            </Select>
          </FormControl>
        </WrapItem>
        <WrapItem m={3}>
          <FormControl>
            <FormLabel>Launch Success</FormLabel>
            <Select
              w={250}
              defaultValue="All"
              onChange={(e) => handleSelect("launch_success", e.target.value)}
            >
              <option value="All">All</option>
              <option value={true}>Successful</option>
              <option value={false}>Failed</option>
            </Select>
          </FormControl>
        </WrapItem>
        <Box m={6} w="100%" d="flex" justifyContent="center">
          <Button w={150} colorScheme="teal" onClick={() => setOptions(query)}>
            Search
          </Button>
        </Box>
      </Wrap>
    </Box>
  );
}

export function LaunchItem({ launch }) {
  const { likeLaunch, state, unlikeLaunch } = React.useContext(
    FavoritesContext
  );
  const isLiked = state.favoriteLaunches
    .map((launch) => launch.flight_number)
    .includes(launch.flight_number);

  return (
    <Box
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Box as={Link} to={`/launches/${launch.flight_number.toString()}`}>
        <Image
          src={
            launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
            launch.links.mission_patch_small
          }
          alt={`${launch.mission_name} launch`}
          height={["200px", null, "300px"]}
          width="100%"
          objectFit="cover"
          objectPosition="bottom"
        />

        <Image
          position="absolute"
          top="5"
          right="5"
          src={launch.links.mission_patch_small}
          height="75px"
          objectFit="contain"
          objectPosition="bottom"
        />

        <Box p="6" position="relative">
          <Box d="flex" alignItems="baseline" position="relative">
            {launch.launch_success ? (
              <Badge px="2" variant="solid" colorScheme="green">
                Successful
              </Badge>
            ) : (
              <Badge px="2" variant="solid" colorScheme="red">
                Failed
              </Badge>
            )}
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {launch.rocket.rocket_name} &bull; {launch.launch_site.site_name}
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {launch.mission_name}
          </Box>
          <Flex>
            <Text fontSize="sm">{formatDate(launch.launch_date_utc)} </Text>
            <Text color="gray.500" ml="2" fontSize="sm">
              {timeAgo(launch.launch_date_utc)}
            </Text>
          </Flex>
        </Box>
      </Box>
      <LikeIcon
        position="absolute"
        bottom="4.5rem"
        right={3}
        size={6}
        isliked={isLiked ? 1 : 0}
        onClick={() =>
          isLiked ? unlikeLaunch(launch.flight_number) : likeLaunch(launch)
        }
      />
    </Box>
  );
}
