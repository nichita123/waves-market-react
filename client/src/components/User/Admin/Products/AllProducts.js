import React, { Component } from 'react';

import UserLayout from "../../../../hoc/UserLayout";

import { connect } from "react-redux";

import {
  getProductsToShop,
  getBrands,
  getWoods
} from "../../../../redux/actions/product_actions";

import ProductBlock from "../../../utils/User/product_block";

class AllProducts extends Component {

  state = {
    isLoading: true
  };

  componentDidMount(){
    this.props.dispatch(getProductsToShop());

    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 1000);
  }

  render() {
    return (
      <UserLayout>
        <ProductBlock
            products={this.props.product}
            type="all_products"
            removeItem={id => this.removeFromCart(id)}
          />
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(AllProducts);