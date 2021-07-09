import history from '../history';
import { SIGN_IN, SIGN_OUT, CREATE_STREAM, GET_STREAM, GET_STREAMS, EDIT_STREAM, DELETE_STREAM } from './types';
import streams from '../apis/streams';

export const signIn = user => {
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

export const createStream = formValues => async (dispatch, getState) => {
    const userId = getState().auth.user.id;
    const response = await streams.post('/streams', { ...formValues, userId });  //formValues is an object
    dispatch({ type: CREATE_STREAM, payload: response.data });
    history.push('/');
};

export const getStreams = () => async dispatch => {
    const { data } = await streams.get('/streams');
    dispatch({ type: GET_STREAMS, payload: data }); 
}

export const getStream = id => async dispatch => {
    const { data } = await streams.get(`/streams/${id}`);
    dispatch({ type: GET_STREAM, payload: data });
}; 

export const editStream = (id, formValues) => async dispatch => {
    const { data } = await streams.patch(`/streams/${id}`, formValues);
    dispatch({ type: EDIT_STREAM, payload: data });
    history.push('/');
}; 

export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/${id}`);
    dispatch({ type: DELETE_STREAM, payload: id });
    history.push('/');
}; 

