import React from 'react'
import {Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from "../pages/Dashboard"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import NavigationPanel from '../components/NavigationPanel'

export const useRoutes = isAuthentificated => {
  if(isAuthentificated) {
    return(
      <>
      <NavigationPanel />
    <Switch>
      <Route exact path="/">
      <Dashboard/>
      </Route>
      <Redirect to="/"/>
    </Switch>
    </>)
  }

  return (<Switch>
 <Route path="/signin">
      <SignIn />
      </Route>
      <Route path="/signup">
      <SignUp />
      </Route>
<Redirect to="/signin"/>
    </Switch>)
}