export const POWER_POKERS_GAME_ACTIONS = {
    POWER_POKERS_LOAD: '/action/power/pokers/game/LOAD',
    POWER_POKERS_INVENTORY: '/action/power/pokers/game/INVENTORY',
    RESET_POWER_POKERS: '/action/power/pokers/game/RESET',
}

export function setPowerPokerCardState(payload) {
    return {
        type: POWER_POKERS_GAME_ACTIONS.POWER_POKERS_LOAD,
        payload
    }
}

export function powerPokersGameInventory(payload) {
    return {
        type: POWER_POKERS_GAME_ACTIONS.POWER_POKERS_INVENTORY,
        payload,
    }
}
    
export function resetPowerPokersCardState() {
    return {
        type: POWER_POKERS_GAME_ACTIONS.RESET_POWER_POKERS
    }
}
