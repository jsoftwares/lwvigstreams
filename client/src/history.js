// import createHistory from 'history/createBrowserHistory';
import { createBrowserHistory } from 'history';

/**history package is installed automatically with react-router-dom. It's a separate library that react-router-dom
 * depends upon as a dependency.
 * We use createHistory to create a browser history object that we maintain and can get access to inside our project
 * . This is similar to <BrowserHistory> which maintains a history that keeps track of d paths in our address bar.
 * When creating/managing you own browser history object, you use a plain router <Router> instead of <BrowserRouter>
 * which manages it history object itself.
 */

export default createBrowserHistory();