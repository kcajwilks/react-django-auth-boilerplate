import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// static files
import 'assets/vendor/nucleo/css/nucleo.css';
import 'assets/vendor/font-awesome/css/font-awesome.min.css';
import 'assets/scss/argon-design-system-react.scss?v1.1.0';

// components
import Login from './Users/Login';
import Register from './Users/Register';
import PasswordReset from './Users/PasswordReset';
import PasswordResetConfirmed from './Users/PasswordResetConfirmed';
import Profile from './Users/Profile';

// redux
import { Provider } from 'react-redux';
import store from '../redux/store';
import { loadUser } from '../redux/actions/auth';

class App extends Component {
  componentDidMount() {
    // load user settings into state if they exist
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Switch>
              <Route exact path="/login" component={Login}></Route>{' '}
              <Route exact path="/register" component={Register}></Route>{' '}
              <Route
                exact
                path="/password-reset"
                component={PasswordReset}
              ></Route>{' '}
              <Route
                exact
                path="/password-reset-confirmed"
                component={PasswordResetConfirmed}
              ></Route>{' '}
              <Route exact path="/profile" component={Profile}></Route>{' '}
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
