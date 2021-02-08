import React from "react";
import { IconButton } from "@chakra-ui/core";
import { Star } from "react-feather";

export default function LikeIcon(props) {
  const { isLiked, like, unlike } = props;
  return (
    <IconButton
      as={Star}
      variant="unstyled"
      onClick={() => (isLiked ? unlike() : like())}
      style={{
        fill: `${isLiked ? "yellow" : "white"}`,
        color: `${isLiked ? "" : "gray"}`,
      }}
      {...props}
    />
  );
}
