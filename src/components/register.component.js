import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";


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

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
        
        
          this.setState({
            message: response.data.message,
            successful: true
          });
         
        },
        error => {
          console.log("2222")
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="container-login100 bg-main" >
      <div className="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
         
          <Form

            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
            >
             <span className="login100-form-title p-b-37">
               Registrarse
            </span>
           {!this.state.successful && (
        <div>
          
            <div className="wrap-input100 validate-input m-b-20" data-validate="Enter usernamel">
           
                <Input
                    type="text"
                    className="input100"
                    placeholder="Usuario"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
              <span className="focus-input100"></span>
            </div>
            <div className="wrap-input100 validate-input m-b-20" data-validate="Enter email">
                <Input
                    type="text"
                    placeholder="Email"
                    className="input100"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
              <span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 validate-input m-b-25" data-validate = "Enter password">

                  <Input
                    type="password"
                    placeholder="Contraseña"
                    className="input100"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
              <span className="focus-input100"></span>
          </div>

          <div className="container-login100-form-btn">
              <button className="login100-form-btn" disabled={this.state.loading}>
                  Registrar
              </button>
              {this.state.loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
          </div>
          
          <div className="text-center">
                <br></br>
              <a href="/login" className="txt2 hov1">
                  Iniciar Sesión
              </a>
          </div>
          </div>
           )}
          {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
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
