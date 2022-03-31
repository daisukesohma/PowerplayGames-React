export const POWER_ROYALS_GAME_ACTIONS = {
    POWER_ROYALS_LOAD: '/action/power/royals/game/LOAD',
    POWER_ROYALS_INVENTORY: '/action/power/royals/game/INVENTORY',
    RESET_POWER_ROYALS: '/action/power/royals/game/RESET',
}

export function setPowerCardState(payload) {
    return {
        type: POWER_ROYALS_GAME_ACTIONS.POWER_ROYALS_LOAD,
        payload
    }
}

export function powerRoyalsGameInventory(payload) {
    return {
        type: POWER_ROYALS_GAME_ACTIONS.POWER_ROYALS_INVENTORY,
        payload,
    }
}
    
export function resetPowerRoyalsCardState() {
    return {
        type: POWER_ROYALS_GAME_ACTIONS.RESET_POWER_ROYALS
    }
}
