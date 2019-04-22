import React, { Component } from 'react';

import UserLayout from "../../../../hoc/UserLayout";

import { connect } from "react-redux";

import {
  getProductsToShop,
  removeProduct
} from "../../../../redux/actions/product_actions";

import ProductBlock from "../../../utils/User/product_block";

import Snackbar from "@material-ui/core/Snackbar";

import MySnackbarContentWrapper from "../../../utils/Snackbars";

class AllProducts extends Component {

  state = {
    isLoading: true,
    isRemoving: false,
    vertical: "top",
    horizontal: "right"
  };

  componentDidMount(){
    this.props.dispatch(getProductsToShop());

    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 1000);
  }

  goToEditProduct = (id) => {
    this.props.history.push(`/admin/products/${id}/edit`)
  }

  removeProduct = (id) => {
    this.props.dispatch(removeProduct(id))
      .then((res) => {
        if(res.payload.success){
          this.setState({
            isRemoving: true
          }, () => {
            setTimeout(() => {
              this.setState({
                isRemoving: false
              })
            }, 2500)
          })
        }
      }).then(() => {
        this.props.dispatch(getProductsToShop());
      })
  }

  handleClose = () => {
    this.setState({ isRemoving: false });
  };

  renderSuccessPopup = (vertical, horizontal) => (
    <Snackbar
      anchorOrigin={{vertical, horizontal}}
      open={this.state.isRemoving}
      autoHideDuration={1200}
      onClose={this.handleClose}
    >
      <MySnackbarContentWrapper
        onClose={this.handleClose}
        variant="success"
        message="Removed..."
        addStyles={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: "Oswald, sans-serif",
          letterSpacing: '0.3px',
          fontSize: '16px'
        }}
        addPadding={{
          paddingRight: '5px'
        }}
      />
    </Snackbar>
  )

  render() {
    return (
      <UserLayout>
        {this.state.isRemoving
          ?  this.renderSuccessPopup(this.state.vertical, this.state.horizontal)
          : null
        }
        <ProductBlock
            products={this.props.product}
            type="all_products"
            removeItem={id => this.removeProduct(id)}
            editProduct={(id) => this.goToEditProduct(id)}
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