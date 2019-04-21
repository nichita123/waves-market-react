import React, { Component } from "react";

import { update, generateData, isFormValid } from "../utils/Form/formActions";

import FormField from "../utils/Form/FormField";

import axios from "axios";

class ResetUser extends Component {
  state = {
    formError: false,
    formSuccess: false,
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
      }
    }
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "reset_email");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "reset_email");
    let formIsValid = isFormValid(this.state.formData, "reset_email");

    if (formIsValid) {
      axios.post('/api/users/reset-user', dataToSubmit)
        .then(res => {
          if(res.data.success){
            this.setState({
              formSuccess: true
            })
          }else{
            this.setState({
              formSuccess: false,
              formError: true
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
      <div className="container">
        <h1>Reset password</h1>

        <form onSubmit={e => this.submitForm(e)}>
          <FormField
            id={"email"}
            formData={this.state.formData.email}
            change={element => this.updateForm(element)}
          />

          {this.state.formError ? (
            <div className="error_label">
              Unexisting email, check your data...
            </div>
          ) : null}

          {this.state.formSuccess ? (
            <div className="form_success">Email sent...</div>
          ) : null}

          <button onClick={e => this.submitForm(e)} className="link_default">
            Reset password
          </button>
        </form>
      </div>
    );
  }
}

export default ResetUser;
