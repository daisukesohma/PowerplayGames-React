import * as Actions from '../../actions/bingoActions';

const INITIAL_STATE = {
    ...Actions.DEFAULT_STATE,
}

const bingo = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case Actions.BINGO_GAME_IN_PROGRESS:
            return {
                ...state,
                bingo_game: actions.payload,
            }
        
        case Actions.BINGO_GAME_RESET:
            return {
                ...state,
                ...actions.payload
            }
        
        case Actions.BINGO_MATCHED_NUMBERS:
            return {
                ...state,
                matchedNumbers: actions.payload,
            }
        
        case Actions.BINGO_GAME_INVENTORY:
            return {
                ...state,
                inventory: actions.payload
            }
        
        case Actions.BINGO_GAME_UPDATE_TARGET_NUMBERS:
            return {
                ...state,
                target_numbers: actions.payload
            }
        
        case Actions.BINGO_GAME_INCREASE_DECREASE:
            return {
                ...state,
                inventory: actions.payload
            }
        case Actions.BINGO_GAME_REPLACEALL:
            return {
                ...state,
                bingo_game: actions.bingo_game,
                target_numbers: actions.target_numbers,
                matchNumbers: actions.matchNumbers,
                inventory: actions.inventory,
            }

        default:
            return state;
    }
}

export default bingo;