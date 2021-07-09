import React from 'react';
import { Router, Route } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import Header from './Header';
import history from '../history';

const App = () => {
    return (
        /**bcos Route is rendering d components with params, react-router-dom adds some props to d rendered compnent
         * one which include match from which we can access d url params. other are history, location etc
         */
    <div className="ui container">
        <Router history={history}>
            <div>
                <Header />
                <Route path="/" exact component={StreamList} />
                <Route path="/streams/new" exact component={StreamCreate} />
                <Route path="/streams/edit/:id" exact component={StreamEdit} />
                <Route path="/streams/show" exact component={StreamShow} />
                <Route path="/streams/delete/:id" exact component={StreamDelete} />
            </div>
        </Router>
    </div>
    );
}

export default App;