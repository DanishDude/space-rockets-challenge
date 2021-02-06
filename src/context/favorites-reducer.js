export const LIKE_LAUNCH = "LIKE_LAUNCH";
export const UNLIKE_LAUNCH = "UNLIKE_LAUNCH";
export const LIKE_LAUNCH_PAD = "LIKE_LAUNCH_PAD";
export const UNLIKE_LAUNCH_PAD = "UNLIKE_LAUNCH_PAD";

export function favoritesReducer(state, action) {
  switch (action.type) {
    case LIKE_LAUNCH:
      return {
        ...state,
        favoriteLaunches: [...state.favoriteLaunches, action.launch],
      };
    case UNLIKE_LAUNCH:
      return {
        ...state,
        favoriteLaunches: state.favoriteLaunches.filter(
          (launch) => launch.flight_number !== action.flight_number
        ),
      };
    case LIKE_LAUNCH_PAD:
      return {
        ...state,
        favoriteLaunchPads: [...state.favoriteLaunchPads, action.launchPad],
      };
    case UNLIKE_LAUNCH_PAD:
      return {
        ...state,
        favoriteLaunchPads: state.favoriteLaunchPads.filter(
          (launchPad) => launchPad.id !== action.id
        ),
      };
    default:
      return state;
  }
}
