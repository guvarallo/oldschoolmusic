import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from '../pages/Main/Main';
import Artists from '../pages/Artists/Artists';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/artists/:id" component={Artists} />
    </Switch>
  )
}

export default Routes;