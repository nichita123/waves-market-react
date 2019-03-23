import React, { Component } from "react";

import UserLayout from "../../hoc/UserLayout";
import MyButton from "../utils/button";

class UserDashboard extends Component {
  render(){
    const { user } = this.props
    return (
      <UserLayout>
        <div>
          <div className="user_nfo_panel">
            <h1>User information</h1>
            <div>
              <span>{user.userData.name}</span>
              <span>{user.userData.lastname}</span>
              <span>{user.userData.email}</span>
            </div>
            <MyButton
              type="default"
              title="Edit account info"
              linkTo="/user/profile"
            />
          </div>
          <div className="user_nfo_panel">
            <h1>History of purchases</h1>
            <div className="user_product_block_wrapper">
              history
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }

};

export default UserDashboard;
