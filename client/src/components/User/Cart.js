import React, { Component } from "react";
import PropTypes from "prop-types";

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
import CircularProgress from "@material-ui/core/CircularProgress";

import ProductBlock from "../utils/User/product_block";

import Paypal from "../utils/Payments/Paypal";
import StripePayment from "../utils/Payments/StripePayment";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import DialogActions from "@material-ui/core/DialogActions";

class Cart extends Component {
  state = {
    open: false,
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
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 1500);
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
          showTotal: false,
          isLoading: false
        });
      } else {
        this.calculateTotal(this.props.user.cartDetail);
      }
    });
  };

  showNotItemMessage = () =>
    this.state.isLoading ? (
      <div
        className="main_loader"
      >
        <CircularProgress
          style={{
            color: "#272723"
          }}
          thickness={7}
        />
      </div>
    ) : (
      <div className="cart_no_items">
        <FontAwesomeIcon icon={faFrown} />
        <div>Your cart is empty...</div>
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

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;
    return (
      <UserLayout>
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
                    transactionCanceled={data => this.transactionCanceled(data)}
                    onSuccess={data => this.transactionSuccess(data)}
                  />
                  {/* <button
                    onClick={this.handleClickOpen}
                    className="link_default"
                  >
                    Checkout with card
                  </button> */}
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

          <Dialog
            fullScreen={fullScreen}
            fullWidth
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Checkout with cart"}
            </DialogTitle>
            <DialogContent>
              <StripePayment
                onSuccess={data => this.transactionSuccess(data)}
              />
            </DialogContent>
            <DialogActions>
              <button onClick={this.handleClose} className="link_default">
                Cancel
              </button>
            </DialogActions>
          </Dialog>
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

Cart.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(withMobileDialog()(Cart));
