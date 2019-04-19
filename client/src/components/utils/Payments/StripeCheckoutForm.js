import React, { Component } from "react";

import { injectStripe, CardElement } from "react-stripe-elements";

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: "15px",
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#9e2146"
      }
    }
  };
};

const formStyles = () => {
  return {
    style: {
      height: "100px",
      backgroundColor: "#fbfbfb",
      padding: "5px",
      marginTop: "15px"
    }
  };
};

class StripeCheckoutForm extends Component {
  state = {
    formError: false,
    formSuccess: false
  };

  submitForm = event => {
    event.preventDefault();

    const { stripe, onSuccess } = this.props;

    if (stripe) {
      stripe.createToken().then(payload => {
        if (payload.error) {
          return this.setState({
            formError: payload.error.message
          });
        }

        onSuccess(payload.token.id);
      });
    } else {
      console.error("Stripe.js hasn't loaded yes");
    }
  };

  render() {
    return (
      <form onSubmit={event => this.submitForm(event)} {...formStyles()}>
        <CardElement {...createOptions()} />

        {this.state.formError ? (
          <div className="error_label">
            {this.state.formError}
          </div>
        ) : null}

        <button
          onClick={event => this.submitForm(event)}
          className="link_default"
        >
          Confirm Payment
        </button>
      </form>
    );
  }
}

export default injectStripe(StripeCheckoutForm);
