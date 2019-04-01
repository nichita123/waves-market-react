import React, { Component } from "react";

import UserLayout from "../../hoc/UserLayout";

import { connect } from "react-redux";
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy
} from "../../redux/actions/user_actions";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faFrown from "@fortawesome/fontawesome-free-solid/faFrown";
import faSmile from "@fortawesome/fontawesome-free-solid/faSmile";

import ProductBlock from "../utils/User/product_block";

import Paypal from "../utils/paypal";

class Cart extends Component {
  state = {
    isLoading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  };

  componentDidMount() {
    let cartItems = [];
    let { user } = this.props;

    if (user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });

        this.props
          .dispatch(getCartItems(cartItems, user.userData.cart))
          .then(() => {
            if (this.props.user.cartDetail.length > 0) {
              this.calculateTotal(this.props.user.cartDetail);
            }
          });
      }
    }
  }

  calculateTotal = cartDetail => {
    let total = 0;

    cartDetail.forEach(item => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    this.setState({
      total,
      showTotal: true
    });
  };

  removeFromCart = id => {
    this.props.dispatch(removeCartItem(id)).then(() => {
      if (this.props.user.cartDetail.length <= 0) {
        this.setState({
          showTotal: false
        });
      } else {
        this.calculateTotal(this.props.user.cartDetail);
      }
    });
  };

  showNotItemMessage = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown} />
      <div>You have no items...</div>
    </div>
  );

  transactionError = data => {
    console.log("ERR");
  };

  transactionCanceled = () => {
    console.log("Canceled");
  };

  transactionSuccess = data => {
    this.props
      .dispatch(
        onSuccessBuy({
          cartDetail: this.props.user.cartDetail,
          paymentData: data
        })
      )
      .then(() => {
        if (this.props.user.successBuy) {
          this.setState({
            showTotal: false,
            showSuccess: true
          });
        }
      });
  };

  render() {
    return (
      <UserLayout>
        <div>
          <h1>My Cart</h1>
          <div className="user_cart">
            <ProductBlock
              products={this.props.user}
              type="cart"
              removeItem={id => this.removeFromCart(id)}
            />
            {this.state.showTotal ? (
              <div className="user_cart_sum">
                {this.state.showTotal ? (
                  <div className="paypal_button_container">
                    <Paypal
                      toPay={this.state.total}
                      transactionError={data => this.transactionError(data)}
                      transactionCanceled={data =>
                        this.transactionCanceled(data)
                      }
                      onSuccess={data => this.transactionSuccess(data)}
                    />
                  </div>
                ) : null}
                <div
                  style={{
                    margin: "10px 0"
                  }}
                >
                  Total amount: &nbsp;&nbsp;
                  <strong>${this.state.total}</strong>
                </div>
              </div>
            ) : this.state.showSuccess ? (
              <div className="cart_success">
                <FontAwesomeIcon icon={faSmile} />
                <div>Thank you for ordering!</div>
              </div>
            ) : (
              this.showNotItemMessage()
            )}
          </div>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Cart);
