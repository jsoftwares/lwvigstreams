import createHistory from 'history/createBrowserHistory';

/**history package is installed automatically with react-router-dom. It's a separate library that react-router-dom
 * depends upon as a dependency.
 * We use createHistory to create a browser history object that we maintain and can get access to inside our project
 * . This is similar to <BrowserHistory> which maintains a history that keeps track of d paths in our address bar
 */

export default createHistory();