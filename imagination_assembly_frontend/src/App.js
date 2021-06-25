import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import * as ROUTES from 'routes.js'


import RegistrationForm from 'pages/registrationform.js'
import ConfirmationPage from 'pages/confirmationpage.js'
import UserReport from 'pages/userreport.js'

import LandingPage from 'pages/landing.js'

import ScrollToTop from 'components/UX/scrolltotop.js'

import './App.css';

import 'styles/bulma.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
            <ScrollToTop />
            

            <main className="App-main">
            

              <Route exact path={ROUTES.LANDING} component={ LandingPage} />

              <Route exact path={ROUTES.REGISTRATION} component={RegistrationForm} />
              <Route exact path={ROUTES.CONFIRMATION} component={ConfirmationPage} />
              <Route exact path={ROUTES.USERREPORT} component={UserReport} />



        
            </main>



          </Router>
      </div>
    );
  }
}

export default App;
