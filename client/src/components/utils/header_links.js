import React from "react";

import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faArrowUp from "@fortawesome/fontawesome-free-solid/faSortUp";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";

import { Link, withRouter } from "react-router-dom";

import PropTypes from "prop-types";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";

const ShowLinks = props => {
  const renderCardImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_available.png";
    }
  };

  const peekCart = user =>
    user.cartDetail
      ? user.cartDetail.length > 0
        ? user.cartDetail.map(item => (
            <ListItem key={item._id}>
              <img
                src={renderCardImage(item.images)}
                alt="cart"
                className="dropdown_menu_image"
              />
              <div className="item_info_wrapper">
                <ListItemText primary={item.name} secondary={item.brand.name} />
                <ListItemText secondary={`Quantity: ${item.quantity}`} />
                <ListItemText secondary={`$${item.price}`} />
              </div>
              <div className="remove">
                <FontAwesomeIcon icon={faTrash} style={{fontSize: '16px', marginLeft: '15px'}} onClick={() => props.removeFromCart(item._id)}/>
              </div>
              <Divider absolute />
            </ListItem>
          ))
        : (
          <div className="dropdown_menu_empty_cart">
            <h6>Sorry,</h6>
            <h6>Your Cart is empty...</h6>
            <Link to="/shop">Go to shop</Link>
          </div>
        )
      : (
        <div className="dropdown_menu_empty_cart">
          <h6>Sorry,</h6>
          <h6>Your Cart is empty...</h6>
          <Link to="/shop">Go to shop</Link>
        </div>
      );

  const cartLinks = (item, i) => {
    const user = props.user.userData;
    const { classes } = props;

    return (
      <div className="cart_link" key={i}>
        {user.cart ? (
          <IconButton
            aria-label="Cart"
            classes={{ root: classes.root }}
            onMouseEnter={props.handleOpenDropDown}
            onMouseLeave={props.handleCloseDropDown}
          >
            {props.openDropDown ? (
              <React.Fragment>
                <div
                  className="dropdown_menu_arrow"
                  onMouseEnter={props.handleOpenDropDown}
                >
                  <FontAwesomeIcon icon={faArrowUp} />
                </div>
                <div
                  className="dropdown_menu"
                  onMouseEnter={props.handleOpenDropDown}
                  onMouseLeave={props.handleCloseDropDown}
                >
                  {props.isLoading ? (
                    <div className="main_loader">
                      <CircularProgress
                        style={{
                          color: "#272723"
                        }}
                        thickness={7}
                      />
                    </div>
                  ) : (
                    <React.Fragment>
                      <List>{peekCart(props.user)}</List>
                    </React.Fragment>
                  )}
                </div>
                <div
                  className="dropdown_menu_end"
                  onMouseEnter={props.handleOpenDropDown}
                  onMouseLeave={props.handleCloseDropDown}
                  style={{cursor: 'default'}}
                >
                  {props.showTotal
                    ? (
                      <React.Fragment>
                        <span className="dropdown_menu_end_total">Total: &nbsp;${props.total}</span>
                        <Link onClick={props.handleCloseDropDown} to="/user/cart" >
                          See all
                        </Link>
                      </React.Fragment>
                    )
                    : null
                  }
                </div>
              </React.Fragment>
            ) : null}

            <Badge
              badgeContent={user.cart.length}
              color="primary"
              classes={{ badge: classes.badge }}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        ) : (
          <IconButton
            aria-label="Cart"
            onMouseEnter={props.handleOpenDropDown}
            onMouseLeave={props.handleCloseDropDown}
          >
            <Badge badgeContent={0} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        )}
        <Link style={{ marginLeft: "0" }} to={item.linkTo}>
          {item.name}
        </Link>
      </div>
    );
  };

  const defaultLink = (item, i) =>
    item.name === "Log out" ? (
      <div
        className="log_out_link"
        key={i}
        onClick={() => props.logoutHandler()}
      >
        {item.name}
      </div>
    ) : (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    );

  const showLinks = (links, user) => {
    let list = [];

    if (user.userData) {
      links.forEach(item => {
        if (!user.userData.isAuth) {
          if (item.public) {
            list.push(item);
          }
        } else {
          if (item.name !== "Log in") {
            list.push(item);
          }
        }
      });
    }

    return list.map((item, i) => {
      if (item.name !== "My Cart") {
        return defaultLink(item, i);
      } else {
        return cartLinks(item, i);
      }
    });
  };

  return (
    <div className={props.className} style={props.styles}>
      {showLinks(props.links, props.user)}
    </div>
  );
};

ShowLinks.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  badge: {
    top: "30%",
    right: 28,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  },
  root: {
    padding: "0",
    marginRight: "3px",
    position: "relative"
  },
  ListItemRoot: {
    position: "absolute"
  }
});

export default withStyles(styles)(withRouter(ShowLinks));
