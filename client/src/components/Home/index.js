import React, { Component } from "react";

import HomeSlider from "./Slider";
import Promotion from "./Promotion";

import { connect } from "react-redux";
import {
  getProductsBySell,
  getProductsByArrival
} from "../../redux/actions/product_actions";

import CardBlock from '../utils/cardBlock';

class Home extends Component {

  componentDidMount(){
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock 
          list={this.props.product.bySell}
          title='Best Selling Guitars'
        />

        <Promotion />
        <CardBlock 
          list={this.props.product.byArrival}
          title='New Arrivals'
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product
  }
}


export default connect(mapStateToProps)(Home);
