export const CARD_GAME_ACTION_TYPES = {
    CARD_LOAD: '/action/card/game/LOAD',
    CARD_INVENTORY: '/action/card/game/INVENTORY',
    RESET_CARD: '/action/card/game/RESET',
}

export function setCardState(payload) {
    return {
        type: CARD_GAME_ACTION_TYPES.CARD_LOAD,
        payload
    }
}

export function cardGameInventory(payload) {
    return {
        type: CARD_GAME_ACTION_TYPES.CARD_INVENTORY,
        payload,
    }
}
    
export function resetCardState() {
    return {
        type: CARD_GAME_ACTION_TYPES.RESET_CARD
    }
}
