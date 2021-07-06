import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    user: null
};

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, user: action.payload };
        case SIGN_OUT:
            return { ...state, isSignedIn: false, user: null}
        default:
            return state;
    }
};