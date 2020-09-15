import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
//import Background from '../../../public/images/bg-01.jpg';


import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      
        <div className="container-login100 bg-main" >
          <div className="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
             
              <Form
              className="login100-form validate-form"
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
                <span className="login100-form-title p-b-37">
                    Iniciar Sesión
                </span>

            <div className="wrap-input100 validate-input m-b-20" data-validate="Enter username or email">
               
                <Input
                type="text"
                className="input100"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
                <span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 validate-input m-b-25" data-validate = "Enter password">
               
                <Input
                type="password"
                className="input100"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
                <span className="focus-input100"></span>
            </div>

            <div className="container-login100-form-btn">
                <button className="login100-form-btn" disabled={this.state.loading}>
                    Entrar
                </button>
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
            </div>
{/*
            <div className="text-center p-t-57 p-b-20">
                <span className="txt1">
                    Or login with
                </span>
            </div>

            <div className="flex-c p-b-112">
                <a href="#" className="login100-social-item">
                    <i className="fa fa-facebook-f"></i>
                </a>

                <a href="#" className="login100-social-item">
                    <img src="images/icons/icon-google.png" alt="GOOGLE" />
                </a>
            </div>
*/}
            <div className="text-center">
            <br></br>
                <a href="/register" className="txt2 hov1">
                    Registrarse
                </a>
            </div>
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
        </Form>
          </div>
      </div>
    );
  }
}
