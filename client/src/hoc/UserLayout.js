import React from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

const links = [
  {
    name: "My account",
    linkTo: "/user/dashboard"
  },
  {
    name: "User information",
    linkTo: "/user/profile"
  },
  {
    name: "My Cart",
    linkTo: "/user/cart"
  }
];

const admin = [
  {
    name: "All products",
    linkTo: "/admin/products"
  },
  {
    name: "Add product",
    linkTo: "/admin/products/add"
  },
  {
    name: "Manage categories",
    linkTo: "/admin/categories/manage"
  },
  {
    name: "Site info",
    linkTo: "/admin/site-info/manage"
  }
  // {
  //   name: 'Upload file',
  //   linkTo: '/admin/file/add'
  // }
];

const UserLayout = props => {
  const generateLinks = links =>
    links.map((item, i) => (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    ));

  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <div className="links">
            <h2>My account</h2>
            {generateLinks(links)}
          </div>
          {props.user.userData.isAdmin ? (
            <div>
              <h2>Admin</h2>
              <div className="links">{generateLinks(admin)}</div>
            </div>
          ) : null}
        </div>

        <div className="user_right">{props.children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UserLayout);
