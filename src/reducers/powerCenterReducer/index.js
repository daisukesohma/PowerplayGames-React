import { GET_ALL_POWER_GAMES } from "../../actions/powerCenterActions";

const INITIAL_STATE = {
  allGames: [],
};

const powerCenterReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case GET_ALL_POWER_GAMES:
      return {
        ...state,
        allGames: actions.payload,
      };

    default:
      return state;
  }
};

export default powerCenterReducer;
