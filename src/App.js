import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddReceta from "./components/add-receta.component";
import Receta from "./components/receta.component";
import ListaRecetas from "./components/recetas-list.component";
import Receipies from "./components/receipies.component";
//import salad from '../public/estilos/img/core-img/salad.png'; 

//admin login
import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <div>
           
   
   
    <div className="search-wrapper">
      <div className="close-btn"><i className="fa fa-times" aria-hidden="true"></i></div>
      <div className="container">
          <div className="row">
              <div className="col-12">
                  <form action="#" method="post">
                      <input type="search" name="search" placeholder="Type any keywords..."></input>
                      <button type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                  </form>
              </div>
          </div>
      </div>
    </div>
    <header className="header-area">

     
      <div className="top-header-area">
          <div className="container h-100">
              <div className="row h-100 align-items-center justify-content-between">

           
                 
                  <div className="col-12 col-sm-5">
                      <div className="breaking-news">
                          <div id="breakingNewsTicker" className="ticker">
                              <ul>
                                  <li><a >Welcome to your favorite recipe app :)</a></li>
                                
                              </ul>
                          </div>
                      </div>
                  </div>

                  
                  <div className="col-12 col-sm-6">
                      <div className="top-social-info text-right">
                       
                          <a href="https://www.facebook.com/lgsoftwareweb" target="blank"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                          <a href="https://twitter.com/lgsoftwareweb" target="blank"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                          <a href="https://www.instagram.com/lgsoftware/" target="blank"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                          <a href="#" target="blank"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                      </div>
                  </div>
              </div>
          </div>
      </div>

     
     
  </header>
  
  
  <div className="">
              <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path={["/receipies", "/receipies"]} component={Receipies} />
                <Route exact path={["/recetas", "/recetas"]} component={ListaRecetas} />
                <Route exact path="/add" component={AddReceta} />
                <Route path="/receta/:id" component={Receta} />
                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />
                <Route path="/user" component={BoardUser} />
                <Route path="/mod" component={BoardModerator} />
                <Route path="/admin" component={BoardAdmin} />
              </Switch>
            </div>
  </div>
    );
  }
}

export default App;
