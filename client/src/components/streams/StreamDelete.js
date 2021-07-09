import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStream, deleteStream } from '../../actions';
import history from '../../history';
import Modal from '../Modal';


const StreamDelete = props => {
    const { id } = props.match.params;
    useEffect( () => {
        props.getStream(id);
        // console.log(props);
    }, []);

    
    const actions = (
        <React.Fragment>
            <Link to='/' className="ui button">Cancel</Link>
            <button onClick={()=>props.deleteStream(id)} className="ui button negative">Delete</button>
        </React.Fragment>
    );

    return(
        <Modal 
            title="Delete Stream" content={`Are you sure you want to delete this stream with title: ${props.stream && props.stream.title}?`}
            actions={actions}
            onDismiss={ ()=> history.push('/')}
        />
    );
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { getStream, deleteStream })(StreamDelete);