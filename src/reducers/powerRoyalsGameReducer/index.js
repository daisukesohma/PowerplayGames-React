import { POWER_ROYALS_GAME_ACTIONS } from '../../actions/powerRoyalsActions'

const INITIAL_STATE = {
    collectedCards: [],
    inventory: {
        replace: 2,
        replaceAll: 2,
        newHands: 2,
        powerMatch: 255,
        increaseOrDecrease: 4
    }
}

const powerRoyalsReducer = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case POWER_ROYALS_GAME_ACTIONS.POWER_ROYALS_LOAD:
            return {
                ...state,
                collectedCards: actions.payload
            };
        
        case POWER_ROYALS_GAME_ACTIONS.POWER_ROYALS_INVENTORY:
            return {
                ...state,
                inventory: actions.payload
            };
        
        case POWER_ROYALS_GAME_ACTIONS.RESET_POWER_ROYALS:
            return {
                ...state,
            };
        
        default:
            return state;
    }
}

export default powerRoyalsReducer