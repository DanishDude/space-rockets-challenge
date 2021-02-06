import React from "react";

import FavoritesContext from "./favorites-context";
import {
  favoritesReducer,
  LIKE_LAUNCH,
  LIKE_LAUNCH_PAD,
  UNLIKE_LAUNCH,
  UNLIKE_LAUNCH_PAD,
} from "./favorites-reducer";

export function StateContext({ children }) {
  React.useReducer();
  const [state, dispatch] = React.useReducer(favoritesReducer, {
    favoriteLaunches: [],
    favoriteLaunchPads: [],
  });

  function likeLaunch(launch) {
    dispatch({ type: LIKE_LAUNCH, launch });
  }

  function unlikeLaunch(flight_number) {
    dispatch({ type: UNLIKE_LAUNCH, flight_number });
  }

  function likeLaunchPad(launchPad) {
    dispatch({ type: LIKE_LAUNCH_PAD, launchPad });
  }

  function unlikeLaunchPad(id) {
    dispatch({ type: UNLIKE_LAUNCH_PAD, id });
  }

  return (
    <FavoritesContext.Provider
      value={{
        state,
        likeLaunch,
        unlikeLaunch,
        likeLaunchPad,
        unlikeLaunchPad,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
