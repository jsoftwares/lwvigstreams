import React from "react";

class GoogleAuth extends React.Component{

    state = { isSignedIn: null };

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
                scope: 'email profile'
            }).then( () => {
                // THIS.AUTH is set as an instance of GoogleAuth returned from our initialization of the library
                // prepending 'this' makes it a global variable & accessible from any other function of this class
                this.auth = window.gapi.auth2.getAuthInstance();
                // Update component level state by adding a isSigned property; this will help re-render d component
                // isSignedIn returns a boolean(true/false) if d user is signed in or not or this.Auth object isn't inititalized
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                /**listen() is a method that we pass a callback to which is invoked anytime the user's signin status
                 * changes. listen() works like an event listener for signIn status of a google user/account
                 */
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }

    // callback that gets invoked anytime .listen() see the user signedIn status has changed
    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    }

    renderAuthButton() {

        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
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

export default GoogleAuth;