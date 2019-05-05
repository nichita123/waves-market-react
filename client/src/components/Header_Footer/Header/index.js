import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";

import { logoutUser } from "../../../redux/actions/user_actions";

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import PropTypes from 'prop-types';


const styles = theme => ({
  badge: {
    top: '30%',
    right: 28,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
  root: {
    padding: '0'
  },
});

class Header extends Component {
  state = {
    page: [
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
    user: [
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

  logoutHandler = () => {
    this.props.dispatch(logoutUser()).then(res => {
      if (res.payload.success) {
        this.props.history.push("/");
      }
    });
  };

  defaultLink = (item, i) =>
    item.name === "Log out" ? (
      <div
        className="log_out_link"
        key={i}
        onClick={() => this.logoutHandler()}
      >
        {item.name}
      </div>
    ) : (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    );



  cartLink = (item, i) => {
    const user = this.props.user.userData;
    const { classes } = this.props;


    return (
      <div className="cart_link" key={i} style={{display: 'inline-flex', alignItems: 'center'}}>
          <span>{user.cart 
            ? <IconButton aria-label="Cart" classes={{root: classes.root}}>
                <Badge badgeContent={user.cart.length} color="primary" classes={{ badge: classes.badge }}>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            : <IconButton aria-label="Cart">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
          }</span>
        <Link style={{marginLeft: '0'}} to={item.linkTo}>{item.name}</Link>
      </div>
    );
  };

  showLinks = type => {
    let list = [];

    if (this.props.user.userData) {
      type.forEach(item => {
        if (!this.props.user.userData.isAuth) {
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
        return this.defaultLink(item, i);
      } else {
        return this.cartLink(item, i);
      }
    });
  };

  render() {
    

   
    
    return (
      <header className="bck_b_light">
        <div className="container">
          <div className="left">
            <Link to="/" className="logo">Waves</Link>
          </div>

          <div className="right">
            <div className="top" style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>{this.showLinks(this.state.user)}</div>

            <div className="bottom">{this.showLinks(this.state.page)}</div>
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

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withRouter(withStyles(styles)(Header)));
