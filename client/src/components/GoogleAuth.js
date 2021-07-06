import React from "react";

class GoogleAuth extends React.Component{

    componentDidMount() {
        /**window tells us that GAPI is a variable available on windows scope inside our browser. Rem we added
         * d google library as a script tag in public/index.html.
         */
        window.gapi.load('client:auth2');
    }
    render() {
        return <div>Google Auth</div>
    }
}

export default GoogleAuth;