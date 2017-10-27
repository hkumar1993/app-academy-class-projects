import React from 'react';
import GreetingContainer from './greeting_container'
import { Route } from 'react-router-dom'
import SessionFormContainer from './session_form_container'
import { AuthRoute } from '../util/route_util'
import SearchContainer from './search_container'

const App = (props) => (
  <div>
    <header>
      <h1>Bench BnB</h1>
      <GreetingContainer />
    </header>
    <AuthRoute path="/login" component={SessionFormContainer} />
    <AuthRoute path="/signup" component={SessionFormContainer} />
    <Route exact path="/" component={ SearchContainer } />
  </div>
);

export default App;
