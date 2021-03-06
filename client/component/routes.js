import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './App';
import Greetings from './Greetings'
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';

export default (
    <Route path="/" component={App} >
        <IndexRoute component={Greetings} />
        <Route path="signup" component={SignupPage} />
        <Route path="login" component={LoginPage} />
    </Route>

)