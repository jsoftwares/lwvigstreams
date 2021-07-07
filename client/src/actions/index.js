import { SIGN_IN, SIGN_OUT } from './types';
import streams from '../apis/streams';

export const signIn = (user) => {
    return {
        type: SIGN_IN,
        payload: user
    };
};


export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = formValues => async dispatch => {
    const response = await streams.post('/streams', formValues);  //formValues is an object
}