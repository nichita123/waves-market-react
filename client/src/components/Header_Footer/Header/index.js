import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";

import { logoutUser } from "../../../redux/actions/user_actions";

import ShowLinks from "../../utils/header_links";

import { getCartItems, removeCartItem } from "../../../redux/actions/user_actions";

class Header extends Component {
  state = {
    openDropDown: false,
    total: 0,
    showTotal: false,
    isLoading: true,
    pageLinks: [
      {
        name: "Home",
        linkTo: "/",
        public: true
      },
      {
        name: "Guitars",
        linkTo: "/shop",
        public: true
      }
    ],
    userLinks: [
      {
        name: "My Cart",
        linkTo: "/user/cart",
        public: false
      },
      {
        name: "My Account",
        linkTo: "/user/dashboard",
        public: false
      },
      {
        name: "Log in",
        linkTo: "/login",
        public: true
      },
      {
        name: "Log out",
        linkTo: "/user/logout",
        public: false
      }
    ]
  };

  peekCartItems = user => {
    let cartItems = [];

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
        isLoading: false,
      });
    }, 1000);
  };

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

  handleOpenDropDown = () => {
    this.setState({
      openDropDown: true
    });
    this.peekCartItems(this.props.user);
  };

  handleCloseDropDown = () => {
    this.setState({
      openDropDown: false
    });
  };

  
  logoutHandler = () => {
    this.props.dispatch(logoutUser()).then(res => {
      if (res.payload.success) {
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <header className="bck_b_dark">
        <div className="container">
          <div className="left">
            <Link to="/" className="logo">
              Waves
            </Link>
          </div>

          <div className="right">
            <ShowLinks
              links={this.state.userLinks}
              user={this.props.user}
              isLoading={this.state.isLoading}
              className="top"
              logoutHandler={() => this.logoutHandler()}
              openDropDown={this.state.openDropDown}
              handleOpenDropDown={() => this.handleOpenDropDown()}
              handleCloseDropDown={() => this.handleCloseDropDown()}
              total={this.state.total}
              showTotal={this.state.showTotal}
              removeFromCart={(id) => this.removeFromCart(id)}
            />

            <ShowLinks
              links={this.state.pageLinks}
              user={this.props.user}
              className="bottom"
            />
          </div>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(withRouter(Header));
