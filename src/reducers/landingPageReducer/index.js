import { LANDING_PAGE_ACTIONS } from '../../actions/landingPageActions';

const INITIAL_STATE = {
    loading: false,
    done: false,
    message: '',
}

const landingPageReducer = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case LANDING_PAGE_ACTIONS.LOADING:
            return {
                ...state,
                loading: true,
                done: false,
            }
        
        case LANDING_PAGE_ACTIONS.DONE:
            return {
                ...state,
                loading: false,
                done: true,
                message: actions.payload
            }
    
        default:
            return state;
    }
}

export default landingPageReducer;