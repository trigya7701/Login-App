import React from "react";
import {Route, Switch} from "react-router-dom";
import Form from "./Form";
import Register from "./Register";



function App() {
  return (
    <Switch>
    <Route exact path='/' component={Form} />
    <Route path='/register' component={Register} />

    </Switch>
  );
}

export default App;
