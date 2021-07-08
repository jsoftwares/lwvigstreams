import React, { useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamEdit = (props) => {
    // console.log(props);
    useEffect( () => {
        props.getStream(props.match.params.id);
    },[]);

    const onSubmit = (formValues) => {
        // console.log(formValues);
        props.editStream(props.match.params.id, formValues);
    }

    if (!props.stream) {
        return <div>Loading...</div>
    }
    return (
        <div>
            {/* initialValues is a special redux-form property & name should be used exactly same way. 
            PICK() is a lodash fn that takes an object & creates a new object of only the properties we specify as 
            strings of in an array. We are using this to exclude d ID & USERID from the stream props we get from state
             */}
            <h3>Edit a Stream</h3>
            <StreamForm initialValues={ _.pick(props.stream, 'title', 'description') } onSubmit={ onSubmit } />
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
}
export default connect(mapStateToProps, { getStream, editStream })(StreamEdit);