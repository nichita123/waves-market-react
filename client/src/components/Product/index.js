import React, { Component } from "react";

import { connect } from "react-redux";

import {
  getProductDetail,
  clearProductDetail
} from "../../redux/actions/product_actions";

import PageTop from "../utils/page_top";

import ProductNFO from "./ProductNFO";
import ProductImgs from './ProductImgs';

class Product extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.dispatch(getProductDetail(id))
      .then((res) => {
        if(!this.props.product.productDetail){
          this.props.history.push('/')
        }
      })
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }

  render() {
    return (
      <div>
        <PageTop title="Product Detail" />

        <div className="container">
          {this.props.product.productDetail ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <div>
                  <ProductImgs 
                    detail={this.props.product.productDetail}
                  />
                </div>
              </div>
              <div className="right">
                <ProductNFO
                  detail={this.props.product.productDetail}
                  addToCart={id => this.addToCartHandler(id)}
                />
              </div>
            </div>
          ) : (
            "Loading"
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  };
};

export default connect(mapStateToProps)(Product);
