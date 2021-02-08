import React from "react";

import FavoritesContext from "./favorites-context";
import {
  favoritesReducer,
  LIKE_LAUNCH,
  LIKE_LAUNCH_PAD,
  LOAD_LAUNCH_LIKES,
  LOAD_LAUNCH_PAD_LIKES,
  UNLIKE_LAUNCH,
  UNLIKE_LAUNCH_PAD,
} from "./favorites-reducer";

export function StateContext({ children }) {
  const [state, dispatch] = React.useReducer(favoritesReducer, {
    favoriteLaunches: [],
    favoriteLaunchPads: [],
  });

  React.useEffect(() => {
    if (localStorage.getItem("favoriteLaunches")) {
      loadLaunchLikes(JSON.parse(localStorage.getItem("favoriteLaunches")));
    }
    if (localStorage.getItem("favoriteLaunchPads")) {
      loadLaunchPadLikes(
        JSON.parse(localStorage.getItem("favoriteLaunchPads"))
      );
    }
  }, []);

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

  function loadLaunchLikes(launches) {
    dispatch({ type: LOAD_LAUNCH_LIKES, launches });
  }

  function loadLaunchPadLikes(launchPads) {
    dispatch({ type: LOAD_LAUNCH_PAD_LIKES, launchPads });
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
