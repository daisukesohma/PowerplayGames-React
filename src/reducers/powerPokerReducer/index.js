import { POWER_POKERS_GAME_ACTIONS } from '../../actions/powerPokerActions'

const INITIAL_STATE = {
    collectedCards: [],
    inventory: {
        replace: 5,
        replaceAll: 1,
        newHands: -1,
        powerMatch: -1,
        increaseOrDecrease: 5
    }
}

const powerPokerReducer = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case POWER_POKERS_GAME_ACTIONS.POWER_POKERS_LOAD:
            return {
                ...state,
                collectedCards: actions.payload
            };
        
        case POWER_POKERS_GAME_ACTIONS.POWER_POKERS_INVENTORY:
            return {
                ...state,
                inventory: actions.payload
            };
        
        case POWER_POKERS_GAME_ACTIONS.RESET_POWER_POKERS:
            return {
                ...state,
            };
        
        default:
            return state;
    }
}

export default powerPokerReducer