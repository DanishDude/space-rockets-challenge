import React from "react";
import { IconButton } from "@chakra-ui/core";
import { Star } from "react-feather";

export default function LikeIcon(props) {
  const { isLiked, like, unlike } = props;
  console.log(props);
  return (
    <IconButton
      bg=""
      as={Star}
      variant="unstyled"
      onClick={() => (isLiked ? unlike() : like())}
      {...props}
    />
  );
}
