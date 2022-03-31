
import { getEmptyStringArray, getRandomNumberBetween, isExistsInList } from "../utility/shared";

export const BINGO_GAME_IN_PROGRESS = '[BINGO GAME] BINGO_GAME_IN_PROGRESS';
export const BINGO_GAME_RESET = '[BINGO GAME] BINGO_GAME_RESET';
export const BINGO_MATCHED_NUMBERS = '[BINGO GAME] BINGO_MATCHED_NUMBERS';
export const BINGO_GAME_INVENTORY = '[BINGO GAME] BINGO_GAME_INVENTORY';
export const BINGO_GAME_POWER_MATCH = '[BINGO GAME] BINGO_GAME_POWER_MATCH';
export const BINGO_GAME_REPLACE = '[BINGO GAME] BINGO_GAME_REPLACE';
export const BINGO_GAME_REPLACEALL = '[BINGO GAME] BINGO_GAME_REPLACEALL';
export const BINGO_GAME_INCREASE_DECREASE = '[BINGO GAME] BINGO_GAME_INCREASE_DECREASE';
export const BINGO_GAME_UPDATE_TARGET_NUMBERS = '[BINGO GAME] BINGO_GAME_UPDATE_TARGET_NUMBERS';
export const BINGO_UPDATED = '[BINGO GAME] BINGO_UPDATED';

export const DEFAULT_STATE = {
    bingo_game: [ getEmptyStringArray(12), getEmptyStringArray(12), getEmptyStringArray(12), getEmptyStringArray(12), getEmptyStringArray(12)],
    target_numbers: [ [1, 2, 3, 4, 5], [16, 17, 18, 19, 20], [31, 32, 33, 34, 35], [46, 47, 48, 49, 50], [61, 62, 63, 64, 65] ],
    matchedNumbers: [],
    inventory: {
        replace: 255,
        replaceAll: 255,
        powerMatch: 255,
        increaseDecrease: 255,
    },
    hasBingoUpdated: false
}

export function resetBingo() {
    return (dispatch, getState) => {
        return dispatch({
            type: BINGO_GAME_RESET,
            payload: DEFAULT_STATE
        })
    }
}

export function bingoInProgress(payload) {
    return dispatch => {
        dispatch({
            type: BINGO_GAME_IN_PROGRESS,
            payload
        })
    }
}

export function setMatchedNumbers(payload) {
    return dispatch => dispatch({
        type: BINGO_MATCHED_NUMBERS,
        payload,
    })
}

export function updateInventory(payload) {
    return dispatch => dispatch({
        type: BINGO_GAME_INVENTORY,
        payload,
    })
}

export function onPowerMatch(callback = () => { }) {
    return (dispatch, getState) => {
        const { inventory = {} } = getState().bingoGame;
        const { powerMatch = 0 } = inventory || {};
        if (powerMatch > 0) {
            let _powerMatch = powerMatch;
            _powerMatch -= 1;
            inventory.powerMatch = _powerMatch;

            callback();
        }
        //update the power values
        return dispatch({
            type: BINGO_GAME_POWER_MATCH,
            payload: inventory
        })
    }
}

export function onReplacePower(callback = () => { }) {
    return (dispatch, getState) => {
        const { inventory = {} } = getState().bingoGame;
        const { replace = 0 } = inventory || {};
        
        if (replace > 0) {
           //power can be used
            let _replace = replace;
            _replace -= 1;
            inventory.replace = _replace;

            callback();
        }

        return dispatch({
            type: BINGO_GAME_REPLACE,
            payload: inventory
        })
    }
}

export function onIncreaseDecrease(callback = () => { }) {
    return (dispatch, getState) => {
        const { inventory = {} } = getState().bingoGame;
        const { increaseDecrease = 0 } = inventory || {};
        if (increaseDecrease > 0) {
            let _increaseDecrease = increaseDecrease;
            _increaseDecrease -= 1;
            inventory.increaseDecrease = _increaseDecrease;

            callback();
        }

        return dispatch({
            type: BINGO_GAME_INCREASE_DECREASE,
            payload: inventory,
        })
    }
}

export function onReplaceAllPower(callback = () => {}) {
    return (dispatch, getState) => {
        const { inventory = {}, target_numbers: oldTargetNumbers = [] } = getState().bingoGame;
        const { replaceAll = 0 } = inventory || {};
        
        
        if(replaceAll > 0) {
            let _rp_all = replaceAll;
            _rp_all -= 1;
            inventory.replaceAll = _rp_all;
            
            const new_target_numbers = [];
            for(let row = 0; row < 5; row++) {
                const columnB = [], columnI = [], columnN = [], columnG = [], columnO = [];
                for (let column = 0; column < 5; column++) {
                    if(row === 0) {
                        //generate number between 1, 15
                        let num = getRandomNumberBetween(1, 15);
                        if(isExistsInList(columnB, num)) {
                            num = getRandomNumberBetween(1, 15);
                        }
                        columnB.push(num);
                    }
                    else if(row === 1) {
                        //generate number between 16, 30
                        let num = getRandomNumberBetween(16, 30);
                        if(isExistsInList(columnI, num)) {
                            num = getRandomNumberBetween(16, 30);
                        }
                        columnI.push(num);
                    }
                    else if(row === 2) {
                        //generate number between 31, 45
                        let num = getRandomNumberBetween(31, 45);
                        if(isExistsInList(columnN, num)) {
                            num = getRandomNumberBetween(31, 45);
                        }
                        columnN.push(num);
                    }
                    else if(row === 3) {
                        //generate number between 46, 60
                        let num = getRandomNumberBetween(46, 60);
                        if(isExistsInList(columnG, num)) {
                            num = getRandomNumberBetween(46, 60);
                        }
                        columnG.push(num);
                    }

                    else if(row === 4) {
                        //generate number between 61, 75
                        let num = getRandomNumberBetween(61, 75);
                        if(isExistsInList(columnO, num)) {
                            num = getRandomNumberBetween(61, 75);
                        }
                        columnO.push(num);
                    }
                }

                if(columnB.length) new_target_numbers.push(columnB);
                else if(columnI.length) new_target_numbers.push(columnI);
                else if(columnN.length) new_target_numbers.push(columnN);
                else if(columnG.length) new_target_numbers.push(columnG);
                else if(columnO.length) new_target_numbers.push(columnO);
            }


            callback();

            return dispatch({
                type: BINGO_GAME_REPLACEALL,
                inventory: inventory,
                matchNumbers: DEFAULT_STATE.matchedNumbers,
                target_numbers: new_target_numbers,
                bingo_game: DEFAULT_STATE.bingo_game
            })
        }

        return dispatch({
            type: ''
        })
    }
}

export function updateTargetNumbers (payload) {
    return dispatch => {
        return dispatch({
            type: BINGO_GAME_UPDATE_TARGET_NUMBERS,
            payload
        })
    }
}