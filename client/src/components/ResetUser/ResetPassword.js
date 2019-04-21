import React, { Component } from "react";

import { update, generateData, isFormValid } from "../utils/Form/formActions";

import FormField from "../utils/Form/FormField";

import axios from "axios";

import Dialog from "@material-ui/core/Dialog";

class ResetPassword extends Component {
  state = {
    resetToken: "",
    formError: false,
    formSuccess: "",
    formErrorMessage: "",
    formData: {
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
      },

      confirmPassword: {
        element: "input",
        value: "",
        config: {
          name: "confirmPassword_input",
          type: "password",
          placeholder: "Confirm your password"
        },
        validation: {
          required: true,
          confirm: "password"
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  componentDidMount() {
    const resetToken = this.props.match.params.token;
    this.setState({
      resetToken
    });
  }

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "reset_pass");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "reset_pass");
    let formIsValid = isFormValid(this.state.formData, "reset_pass");

    if (formIsValid) {
      axios.post('/api/users/reset-password', 
        {
          ...dataToSubmit,
          resetToken: this.state.resetToken
        }
      ).then(res => {
        try {
          if(!res.data.success){
            this.setState({
              formError: true,
              formErrorMessage: res.data.message
            })
          }else{
            this.setState({
              formError: false,
              formSuccess: true
            }, () => {
              setTimeout(() => {
                this.props.history.push('/login')
              }, 3000)
            })
          }
        } catch (error) {
          this.setState({
            formError: true,
            formErrorMessage: res.data.message
          })
        }
      })
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    return (
      <React.Fragment>
      <form onSubmit={e => this.submitForm(e)}>
        <div className="container" style={{ marginTop: "100px" }}>
          <h2>Reset password</h2>
          <div className="form_block_two">
            <div className="block">
              <FormField
                id={"password"}
                formData={this.state.formData.password}
                change={element => this.updateForm(element)}
              />
            </div>

            <div className="block">
              <FormField
                id={"confirmPassword"}
                formData={this.state.formData.confirmPassword}
                change={element => this.updateForm(element)}
              />
            </div>
          </div>

          {this.state.formError ? (
            <div className="error_label">
              {this.state.formErrorMessage}
            </div>
          ) : ''}

          <button
            onClick={event => this.submitForm(event)}
            className="link_default"
          >
            Reset Password
          </button>
        </div>
      </form>

      <Dialog
          open={this.state.formSuccess}
        >
          <div className="dialog_alert">
            <div>Password has been successfully reset!</div>
          </div>
        </Dialog>
      </React.Fragment>

      
    );
  }
}

export default ResetPassword;
