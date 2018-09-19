import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class RegisterSignIn extends Component {

  state = {
    signup : false,
    login : true
  }

  switch = (word) => {
    var signup,login;
    if(word === "signup") {
      signup = true;
      login = false;
    }
    else {
      login = true; 
      signup = false;
    }
    return this.setState({
      login:login,
      signup:signup
    })
  }

  render() {

    var self = this;

    return (
      <div>
        <div id="buttons">
          <Button color="secondary" id="signupButton" onClick={self.switch.bind(null,"signup")} className={self.state.signup ? "yellow":"blue"}>Sign Up</Button>
          <Button color="secondary" id="loginButton" onClick={self.switch.bind(null,"login")} className={self.state.login ? "yellow":"blue"}> Sign In</Button>
        </div>
        {self.state.signup ? <Signup /> : null}
        {self.state.login ? <Login /> : null}
      </div>
    );
  }
}

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      //confirm: ''
    };
    this.handlechange = this.handlechange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handlechange = (e) => {
      this.setState({
        [e.target.name] : e.target.value
      })
    }

    handleSubmit = (e) => {
      e.preventDefault();
      console.log(e);
      fetch('http://localhost:8080/signup', {
        method : 'POST',
        body: JSON.stringify(this.state)
      }).then(response => {
        if (response.ok) {
          response.json().then(json => {
            console.log(json);
            var user = {
              username: json.username,
              isadmin: json.isadmin,
              isloggedin: true
            };
            localStorage.setItem('user', JSON.stringify(user));
          });
        }
      });
    }

  render() {
    return (
      <div>
        <div id="signup">
        <form name="SignUp" onSubmit={this.handleSubmit}>
          <TextField placeholder="First Name" name="firstname" type="text" value={this.state.firstname} onChange={(e) => this.handlechange(e)} /><br /><br />
          <TextField placeholder="Last Name" name="lastname" type="text" value={this.state.lastname} onChange={(e) => this.handlechange(e)} /><br /><br />
          <TextField placeholder="Username" name="username" type="text" value={this.state.username} onChange={(e) => this.handlechange(e)} /><br /><br />
          <TextField placeholder="Email" name="email" type="text" value={this.state.email} onChange={(e) => this.handlechange(e)} /><br /><br />
          <TextField placeholder="Password" name="password" type="password" value={this.state.password} onChange={(e) => this.handlechange(e)} /><br /><br />
          {/*<TextField placeholder="Re-enter Password" name="confirm" type="password" value={this.state.confirm} onChange={(e) => this.handlechange(e)} />*/}
          <Button color="primary" type="submit">Sign Up</Button>
        </form>

        </div>
      </div>
    )
  }
}

class Login extends Component {
  constructor() {
    super();
    this.state = {
      SignInUsername : '',
      SignInPassword : ''
    }
    console.log(localStorage);
    this.handlechange = this.handlechange.bind(this);

  }

  handlechange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(e);
    //console.log(JSON.stringify(this.state));
    fetch("http://localhost:8080/signin", {
      method : 'POST',
      body : JSON.stringify(this.state) 
    }).then(response => {
      if(response.ok) {
        response.json().then(json => {
          //console.log(json)
          var user = {
            username : json.user.username,
            isadmin : json.user.isadmin,
            isloggedin : true
          };
          localStorage.setItem('user', JSON.stringify(user));
          console.log(JSON.parse(localStorage.getItem('user')));
          //window.location.reload();
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div id="signup">
          <form name="SignIn" onSubmit={this.handleSubmit}>
            <TextField placeholder="Username" name="SignInUsername" type="text" value={this.state.SignInUsername} onChange={(e) => this.handlechange(e)} /><br /><br />
            <TextField placeholder="Password" name="SignInPassword" type="password" value={this.state.SignInPassword} onChange={(e) => this.handlechange(e)} /><br /><br />
            <Button type="submit">Sign In</Button>
          </form>
        </div>
      </div>
    )
  }
}


export default RegisterSignIn;
