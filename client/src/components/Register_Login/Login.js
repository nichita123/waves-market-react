import React, { Component } from "react";

import FormField from "../utils/Form/FormField";
import { update, generateData, isFormValid } from "../utils/Form/formActions";

import { withRouter, Link } from "react-router-dom";

import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/user_actions";

import Snackbar from "@material-ui/core/Snackbar";

import MySnackbarContentWrapper from "../utils/Snackbars";

class Login extends Component {
  state = {
    loginSuccess: false,
    vertical: "top",
    horizontal: "right",
    formError: false,
    formSuccess: "",
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  updateForm = element => {
    const newFormdata = update(element, this.state.formData, "login");
    this.setState({
      formError: false,
      formData: newFormdata
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "login");
    let formIsValid = isFormValid(this.state.formData, "login");

    if (formIsValid) {
      this.props.dispatch(loginUser(dataToSubmit)).then(response => {
        if (response.payload.loginSuccess) {
          this.setState({
            loginSuccess: true
          })

          setTimeout(() => {
            this.props.history.push("/user/dashboard");
          }, 1300)  
        } else {
          this.setState({
            formError: true
          });
        }
      });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  handleClose = () => {
    this.setState({ loginSuccess: false });
  };

  renderSuccessPopup = (vertical, horizontal) => (
    <Snackbar
      anchorOrigin={{vertical, horizontal}}
      open={this.state.loginSuccess}
      autoHideDuration={1200}
      onClose={this.handleClose}
    >
      <MySnackbarContentWrapper
        onClose={this.handleClose}
        variant="success"
        message="Logged in successfully!"
        addStyles={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: "Oswald, sans-serif",
          letterSpacing: '0.3px',
          fontSize: '16px'
        }}
        addPadding={{
          paddingRight: '5px'
        }}
      />
    </Snackbar>
  )

  render() {
    return (
      <div className="signin_wrapper">
        {this.state.loginSuccess
          ? this.renderSuccessPopup(this.state.vertical, this.state.horizontal)
          : null
        }
        <form onSubmit={event => this.submitForm(event)}>
          <FormField
            id={"email"}
            formData={this.state.formData.email}
            change={element => this.updateForm(element)}
          />

          <FormField
            id={"password"}
            formData={this.state.formData.password}
            change={element => this.updateForm(element)}
          />

          {this.state.formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}
          <button onClick={event => this.submitForm(event)}>Log in</button>
          <Link to="/reset-user">Forgot password?</Link>
        </form>
      </div>
    );
  }
}

export default connect()(withRouter(Login));
