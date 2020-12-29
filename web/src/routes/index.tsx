import React from 'react';
import { Switch } from 'react-router-dom';

// custom Route
import Route from './Route';

/* Pages */
import SignIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';
// ---------------
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/forgotpassword" component={ForgotPassword} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
