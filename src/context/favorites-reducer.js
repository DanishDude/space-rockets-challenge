export const LIKE_LAUNCH = "LIKE_LAUNCH";
export const LIKE_LAUNCH_PAD = "LIKE_LAUNCH_PAD";
export const LOAD_LAUNCH_LIKES = "LOAD_LAUNCH_LIKES";
export const LOAD_LAUNCH_PAD_LIKES = "LOAD_LAUNCH_PAD_LIKES";
export const UNLIKE_LAUNCH = "UNLIKE_LAUNCH";
export const UNLIKE_LAUNCH_PAD = "UNLIKE_LAUNCH_PAD";

export function favoritesReducer(state, action) {
  let updatedList = [];

  switch (action.type) {
    case LOAD_LAUNCH_LIKES:
      return { ...state, favoriteLaunches: action.launches };

    case LOAD_LAUNCH_PAD_LIKES:
      return { ...state, favoriteLaunchPads: action.launchPads };

    case LIKE_LAUNCH:
      updatedList = [...state.favoriteLaunches, action.launch];
      localStorage.setItem("favoriteLaunches", JSON.stringify(updatedList));
      return { ...state, favoriteLaunches: updatedList };

    case UNLIKE_LAUNCH:
      updatedList = state.favoriteLaunches.filter(
        (launch) => launch.flight_number !== action.flight_number
      );
      localStorage.setItem("favoriteLaunches", JSON.stringify(updatedList));
      return { ...state, favoriteLaunches: updatedList };

    case LIKE_LAUNCH_PAD:
      updatedList = [...state.favoriteLaunchPads, action.launchPad];
      localStorage.setItem("favoriteLaunchPads", JSON.stringify(updatedList));
      return { ...state, favoriteLaunchPads: updatedList };

    case UNLIKE_LAUNCH_PAD:
      updatedList = state.favoriteLaunchPads.filter(
        (launchPad) => launchPad.id !== action.id
      );
      localStorage.setItem("favoriteLaunchPads", JSON.stringify(updatedList));
      return { ...state, favoriteLaunchPads: updatedList };

    default:
      return state;
  }
}
