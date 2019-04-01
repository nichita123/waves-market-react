import React, { Component } from 'react';

import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
  render() {

    const onSuccess = (payment) => {
      this.props.onSuccess(payment)
    }

    const onCancel = (data) => {
      console.log(JSON.stringify(data))
    }

    const onError = (err) => {
      console.log(JSON.stringify(err))
    }

    let env = 'sandbox';
    let currency = 'USD';
    let total = this.props.toPay;

    const client = {
      sandbox: 'ATMb8B5l9vZzS86CXpqM0QxJhBQebvEOO2RnOUpjMLkd-et2DH4Via4t6aobLIEZE-OridUhkO0PYt1Z',
      production: ''
    }

    return (
      <div>
        <PaypalExpressBtn 
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: 'medium',
            color: 'blue',
            shape: 'rect',
            label:  'pay',
            layout: 'vertical'
          }}
        />
      </div>
    );
  }
}

export default Paypal;