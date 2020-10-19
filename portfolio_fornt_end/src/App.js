import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjetcsPage from './pages/ProjectsPage';
import ResumePage from './pages/ResumePage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

import NavBar from './NavBar';

class App extends Component{
  render(){
    return (
        <div className="App">
            <Router>
                <NavBar />
                <Switch>
                  <Route exact path="/" component={HomePage}/>
                  <Route path="/About" component={AboutPage}/>
                  <Route path="/Projects" component={ProjetcsPage}/>
                  <Route path="/Resume" component={ResumePage}/>
                  <Route path="/Contact" component={ContactPage}/>
                  <Route component={NotFoundPage}/>
                </Switch>
            </Router>
          </div>        
    );
  }
}

export default App;
