import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";

import logo from './logo.png'; 

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/recetas" className="navbar-brand">
          <img src={logo} alt="Logo" />
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/recetas"} className="nav-link">
                Buscar Recetas
              </Link>
            </li>
          {/*
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          */}
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/recetas"]} component={TutorialsList} />
            <Route exact path="/add" component={AddTutorial} />
            <Route path="/receta/:id" component={Tutorial} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
