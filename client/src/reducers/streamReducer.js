import _ from 'lodash';
import { CREATE_STREAM, GET_STREAM, GET_STREAMS, EDIT_STREAM, DELETE_STREAM } from '../actions/types';

export default (state={}, action) => {
    switch (action.type) {
        case GET_STREAMS:
            /**mapKey() is a lodash fn that takes an array & returns an object. D keys of this new object are going to be taken from each
             * individaul record inside d array. so we called mapKeys() with an array of streams we got from d api, & pass a string of ID
             * as 2nd argument which tell lodash foreach of d object inside d original array, use a key taken from d ID property of each
             * one to create that record insise d new object. ..._.mapKeys(), d ... takes d key-vlaue pairs from d big object returned 
             * from mapKeys() & adds them to d new overal big object that gets created by { ..state }
             */
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case GET_STREAM:
            //[action.payload.id]- key interpolation. specifies a key based on d new object we're spreading
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            //for delete action creator, our payload was d ID of d stream we deleting. omit() creates a new object of our state exclusive of object with d specified key
            return _.omit(state, action.payload);
        default:
            return state;
    }
};