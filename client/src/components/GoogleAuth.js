import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component{

    componentDidMount() {
        /**window tells us that GAPI is a variable available on windows scope inside our browser. Rem we added
         * d google library as a script tag in public/index.html. Since d gapi contains alot of other functionalities
         * & is called by alot of apps, google tries to keep it small, so use d LOAD() method to load d part of d library
         *  that we want to use.
         * When our component is rendered on the screen, we load up that client portion of d library. Since it takes some
         * amount of time for d library to reachout to google servers & download some additional JS code, so we need to 
         * get a callback of when that process completes, so we add a callback as 2nd argument to load()
         * After it is loaded, we initialize d oauth client with our OAuth client ID & also specify d scopes (dspecifies 
         * which data of the user your application will use.)
         */
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({   //init() returns a Promise
                clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
                scope: 'email'
            }).then( () => {
                // THIS.AUTH is set as an instance of GoogleAuth returned from our initialization of the library
                // prepending 'this' makes it a global variable & accessible from any other function of this class
                this.auth = window.gapi.auth2.getAuthInstance();

                /**once we initialize GAPI, we chain onto d returned Promise then, create an instance of d OAuth
                 * object which contains several functions (signIn, signOut, listen, isSignedIn etc). We then invoke
                 * our onAuthChange method whose purpose is to creates a redux action based upon d boolean value 
                 * (representing d  authentication status of the user) that we pass it 
                 */
                this.onAuthChange(this.auth.isSignedIn.get());
                
                
                /**listen() is a method that we pass a callback, which is invoked anytime the user's auth status
                 * changes. The callback (onAuthChange) is usually called with a boolean argument of true/false
                 * listen() works like an event listener for signIn status of a google user/account
                 */
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    // callback that gets invoked by .listen() anytime it see the user authentication status has changed
    // We update redux state base on boolean value.
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.currentUser = {
                id: this.auth.currentUser.get().getId(),
                name: this.auth.currentUser.get().getBasicProfile().getName(),
                email: this.auth.currentUser.get().getBasicProfile().getEmail()
            };
            this.props.signIn(this.currentUser)
        } else {
            this.props.signOut()
        }
    }


    renderAuthButton() {

        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return <button onClick={this.auth.signOut} className="ui red google button">
                <i className="google icon"></i> Sign Out
            </button>;
        } 
        else {
            return (<button onClick={this.auth.signIn} className="ui red google button">
                <i className="google icon"></i> Sign In with Google
            </button>);
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn, user: state.auth.user }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);