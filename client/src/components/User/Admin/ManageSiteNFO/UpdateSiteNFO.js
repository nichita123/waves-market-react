import React, { Component } from "react";

import FormField from "../../../utils/Form/FormField";
import {
  update,
  generateData,
  isFormValid,
  populateFields
} from "../../../utils/Form/formActions";

import {
  getSiteInfo,
  updateSiteInfo
} from "../../../../redux/actions/site_actions";

import { connect } from "react-redux";

class UpdateSiteNFO extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      address: {
        element: "input",
        value: "",
        config: {
          label: "Address",
          name: "address_input",
          type: "text",
          placeholder: "Enter the site address"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      hours: {
        element: "input",
        value: "",
        config: {
          label: "Working hours",
          name: "hours_input",
          type: "text",
          placeholder: "Enter working hours"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      phone: {
        element: "input",
        value: "",
        config: {
          label: "Phone number",
          name: "phone_input",
          type: "text",
          placeholder: "Enter phone number"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      email: {
        element: "input",
        value: "",
        config: {
          label: "Email",
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
        validationMessage: "",
        showLabel: true
      }
    }
  };

  componentDidMount() {
    this.props.dispatch(getSiteInfo()).then(() => {
      const newFormData = populateFields(
        this.state.formData,
        this.props.site.siteData[0]
      );

      this.setState({
        formData: newFormData
      });
    });
  }

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "site_info");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "site_info");
    let formIsValid = isFormValid(this.state.formData, "site_info");

    if (formIsValid) {
      this.props.dispatch(updateSiteInfo(dataToSubmit))
        .then(() => {
          this.setState({
            formSuccess: true
          }, () => {
            setTimeout(() => {
              this.setState({
                formSuccess: false
              })
            }, 2000)
          })
        });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={event => this.submitForm(event)}>
          <h2>Update Site Info</h2>

          <div className="form_block_two">
            <div className="block">
              <FormField
                id={"phone"}
                formData={this.state.formData.phone}
                change={element => this.updateForm(element)}
              />
            </div>

            <div className="block">
              <FormField
                id={"hours"}
                formData={this.state.formData.hours}
                change={element => this.updateForm(element)}
              />
            </div>
          </div>

          <div>
            <FormField
              id={"address"}
              formData={this.state.formData.address}
              change={element => this.updateForm(element)}
            />
          </div>

          <div>
            <FormField
              id={"email"}
              formData={this.state.formData.email}
              change={element => this.updateForm(element)}
            />
          </div>

          {this.state.formSuccess ? (
            <div className="form_success">Successfully Updated!</div>
          ) : null}

          {this.state.formError ? (
            <div className="error_label">
              Something went wrong, check your data...
            </div>
          ) : null}

          <button
            onClick={event => this.submitForm(event)}
            className="link_default"
          >
            Update Site Info
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    site: state.site
  };
};

export default connect(mapStateToProps)(UpdateSiteNFO);
