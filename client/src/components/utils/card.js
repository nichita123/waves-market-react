import React, { Component } from "react";

import MyButton from "../utils/button";

import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/user_actions";

import Snackbar from "@material-ui/core/Snackbar";

import MySnackbarContentWrapper from "./Snackbars";

import Tooltip from "@material-ui/core/Tooltip";

class Card extends Component {
  state = {
    open: false,
    vertical: "top",
    horizontal: "center"
  };

  renderCardImage(images) {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_available.png";
    }
  }

  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  renderPopUp = (vertical, horizontal) => (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={this.state.open}
      autoHideDuration={6000}
      onClose={this.handleClose}
    >
      <MySnackbarContentWrapper
        onClose={this.handleClose}
        variant="error"
        message="You must be logged in"
        addStyles={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Oswald, sans-serif",
          letterSpacing: "0.3px",
          fontSize: "16px"
        }}
        addPadding={{
          paddingRight: "5px"
        }}
      />
    </Snackbar>
  );

  render() {
    const props = this.props;
    return (
      <div className={`card_item_wrapper ${props.grid}`}>
        {this.renderPopUp(this.state.vertical, this.state.horizontal)}
        <div
          className="image"
          style={{
            background: `url(${this.renderCardImage(
              props.images
            )}) no-repeat center`
          }}
        />
        <div className="action_container">
          <div className="tags">
            <div className="brand">{props.brand.name}</div>
            <div className="name">{props.name}</div>
            <div className="price">${props.price}</div>
          </div>

          {props.grid ? (
            <div className="description">
              {props.desc}
            </div>
          ) : null}
          <div className="actions">
            <div className="button_wrap">
              <MyButton
                type="default"
                altClass="card_link"
                title="View product"
                linkTo={`/product/detail/${props._id}`}
                addStyles={{
                  margin: "10px 0 0 0"
                }}
              />
            </div>
            <Tooltip title="Add to cart" placement="top-end">
              <div className="button_wrap">
                <MyButton
                  type="bag_link"
                  runAction={() => {
                    props.user.userData.isAuth
                      ? this.props.dispatch(addToCart(props._id))
                      : this.setState({
                          open: true,
                          vertical: "top",
                          horizontal: "right"
                        });
                  }}
                />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Card);
