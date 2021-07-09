import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStreams } from '../../actions';

const StreamList = (props) => {
    useEffect( ()=> {
        props.getStreams();
    },[]);

    const manageStream = stream => {
        // console.log(stream.userId);
        if (props.isSignedIn && stream.userId === props.currentUser.id) {
            return (
                <div className='right floated content'>
                    <Link to={`/streams/edit/${stream.id}`} className='ui button primary'>Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className='ui button negative'>Delete</Link>
                </div>
            );
        }
        
    };

    const renderLists = () => {
        return props.streams.map( stream => {
            return (
                <div key={stream.id} className="item">
                    {manageStream(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <div>{stream.title}</div>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    };

    const renderCreate = () => {
        if (props.isSignedIn) {
            return(
                <div className="eight wide column" style={ {textAlign:'right'}}>
                    <Link to="/streams/new" className="ui button primary">Create Stream</Link>
                </div>
            );
        }
    }

    return (
            <div>
                <div className="ui grid">
                    <h2 className="eight wide column">Streams</h2>
                    {renderCreate()}
                </div>
                <div className="ui celled list">{renderLists()}</div>
            </div>
        );
};

const mapStateToProps = state => {
    /**Oject.values() converts our streams states store as an oject to an array so that we can easily map through it */
    return { 
        streams: Object.values(state.streams),
        currentUser: state.auth.user,
        isSignedIn: state.auth.isSignedIn

    };
};
export default connect(mapStateToProps, { getStreams})(StreamList);