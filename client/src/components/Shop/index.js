import React, { Component } from "react";

import PageTop from "../utils/page_top.js";

import { connect } from "react-redux";

import {
  getProductsToShop,
  getBrands,
  getWoods
} from "../../redux/actions/product_actions";

import CollapseCheckbox from "../utils/collapse_checkbox";
import CollapseRadio from "../utils/collapse_radio";

import { frets, price } from "../utils/Form/fixed_categories";

import LoadMoreCards from "./LoadMoreCards";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";
import faTh from "@fortawesome/fontawesome-free-solid/faTh";

import CircularProgress from "@material-ui/core/CircularProgress";

class Shop extends Component {
  state = {
    isLoading: true,
    grid: "",
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: []
    },
    publish: true
  };

  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getWoods());

    this.props.dispatch(
      getProductsToShop(this.state.skip, this.state.limit, this.state.filters)
    );

    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 1000);
  }

  handlePrice = value => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }

    return array;
  };

  showFilteredResults = filters => {
    this.props
      .dispatch(getProductsToShop(0, this.state.limit, filters))
      .then(() => {
        this.setState({
          skip: 0
        });
      });
  };

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = this.handlePrice(filters);

      newFilters[category] = priceValues;
    }

    this.showFilteredResults(newFilters);

    this.setState({
      filters: newFilters
    });
  };

  loadMoreCards = () => {
    let skip = this.state.skip + this.state.limit;

    this.props
      .dispatch(
        getProductsToShop(
          skip,
          this.state.limit,
          this.state.filters,
          this.props.product.toShop
        )
      )
      .then(() => {
        this.setState({
          skip
        });
      });
  };

  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? "grid_bars" : ""
    });
  };

  render() {
    const { product } = this.props;

    return (
      <div className="shop">
        <PageTop title="Browse Products" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="Brands"
                list={product.brands}
                handleFilters={filters => this.handleFilters(filters, "brand")}
              />
              <CollapseCheckbox
                initState={false}
                title="Frets"
                list={frets}
                handleFilters={filters => this.handleFilters(filters, "frets")}
              />
              <CollapseCheckbox
                initState={false}
                title="Wood"
                list={product.woods}
                handleFilters={filters => this.handleFilters(filters, "wood")}
              />
              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={filters => this.handleFilters(filters, "price")}
              />
            </div>

            <div className="right">
              <div className="shop_options">
                <div className="shop_grids">
                  <div
                    className={`grid_btn ${this.state.grid ? "" : "active"}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </div>

                  <div
                    className={`grid_btn ${!this.state.grid ? "" : "active"}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
              </div>
              <div>
                {this.state.isLoading ? (
                  <div className="main_loader">
                    <CircularProgress
                      style={{
                        color: "#272723"
                      }}
                      thickness={7}
                    />
                  </div>
                ) : null}
                <LoadMoreCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={product.toShopSize}
                  products={product.toShop}
                  loadMore={() => this.loadMoreCards()}
                />
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps)(Shop);
