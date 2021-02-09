import React from "react";
import { IconButton } from "@chakra-ui/react";
import { Star } from "react-feather";

export default function LikeIcon(props) {
  const { isliked } = props;
  const styles = {
    fill: `${isliked ? "yellow" : "white"}`,
    color: `${isliked ? "" : "gray"}`,
  };

  return <IconButton as={Star} variant="unstyled" style={styles} {...props} />;
}
