export const LANDING_PAGE_ACTIONS = {
    LOADING: '/actions/landing/page/LOADING',
    DONE: '/actions/landing/page/DONE'
}

export function landingPageLoading() {
    return {
        type: LANDING_PAGE_ACTIONS.LOADING
    }
}

export function landingPageDone(payload) {
    return {
        type: LANDING_PAGE_ACTIONS.DONE,
        payload
    }
}