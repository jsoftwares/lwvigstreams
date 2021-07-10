import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';
import { getStream } from '../../actions';

const StreamShow = props => {
    const videoRef = useRef();
    const {id} = props.match.params;
    useEffect( () => {
        props.getStream(id);
        const player = flv.createPlayer({
            type: 'flv',
            isLive: true,
            url: `http://locahost:8080/live/${id}.flv`
        });
        if (videoRef.current) {
            player.attachMediaElement(videoRef.current);
            player.load();
        }

        return () => {
            player.destroy();
        }

    },[]);

    if (!props.stream) {
        return <div>Loading...</div>;
    }

    const { title, description } = props.stream;
    return (
        <div>
            <video ref={videoRef} style={ {width: '100%'}} controls />
            <h1>{title}</h1>
            <h5>{description}</h5>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id],
    state };
};
export default connect(mapStateToProps, { getStream })(StreamShow);