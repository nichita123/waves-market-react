import React, { Component } from "react";

import { Elements } from "react-stripe-elements";

import StripeCheckoutForm from "./StripeCheckoutForm";

class StripePayment extends Component {
  render() {
    return (
      <div>
        <Elements>
          <StripeCheckoutForm {...this.props}/>
        </Elements>
      </div>
    );
  }
}

export default StripePayment;
