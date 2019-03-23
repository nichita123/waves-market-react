import React, { Component } from "react";

import HomeSlider from "./Slider";
import Promotion from "./Promotion";

import { connect } from "react-redux";
import {
  getProductsBySell,
  getProductsByArrival
} from "../../redux/actions/product_actions";

import CardBlock from "../utils/cardBlock";

import CircularProgress from "@material-ui/core/CircularProgress";

class Home extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());

    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 400);
  }

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <div className="main_loader">
            <CircularProgress
              style={{
                color: "#272723",
                marginBottom: '1000px'
              }}
              thickness={7}
            />
          </div>
        ) : (
          <React.Fragment>
            <HomeSlider />
            <CardBlock
              list={this.props.product.bySell}
              title="Best Selling Guitars"
            />

            <Promotion />
            <CardBlock
              list={this.props.product.byArrival}
              title="New Arrivals"
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  };
};

export default connect(mapStateToProps)(Home);
