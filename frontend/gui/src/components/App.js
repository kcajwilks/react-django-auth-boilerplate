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
import PasswordResetConfirm from './Users/PasswordResetConfirm';
import PasswordResetComplete from './Users/PasswordResetComplete';
import Profile from './Users/Profile';

// redux
import { Provider } from 'react-redux';
import store from '../redux/store';

// utirls and more
import { loadUser } from '../redux/actions/auth';
import PrivateRoute from './Utils/PrivateRoute';

// react-alerts
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
const alertOptions = {
  timeout: 3000,
  position: 'top center',
};

class App extends Component {
  componentDidMount() {
    // load user settings into state if they exist
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <AlertProvider
          template={AlertTemplate}
          {...alertOptions}
        ></AlertProvider>
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
                path="/reset/:uid/:token"
                component={PasswordResetConfirm}
              />
              <Route
                exact
                path="/password-reset/complete"
                component={PasswordResetComplete}
              ></Route>{' '}
              <PrivateRoute
                exact
                path="/profile"
                component={Profile}
              ></PrivateRoute>{' '}
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
