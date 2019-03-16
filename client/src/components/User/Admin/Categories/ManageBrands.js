import React, { Component } from "react";

import { connect } from "react-redux";

import FormField from "../../../utils/Form/FormField";
import {
  update,
  generateData,
  isFormValid,
  resetFields
} from "../../../utils/Form/formActions";

import { getBrands, addBrand } from "../../../../redux/actions/product_actions";

class ManageBrands extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "brand_input",
          type: "text",
          placeholder: "Enter the brand"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  componentDidMount() {
    this.props.dispatch(getBrands());
  }

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "brands");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "brands");
    let formIsValid = isFormValid(this.state.formData, "brands");
    let existingBrands = this.props.product.brands;

    if (formIsValid) {
      this.props.dispatch(addBrand(dataToSubmit, existingBrands))
        .then(res => {
          if(res.payload.success){
            this.resetFieldsHandler();
          }else{
            this.setState({
              formError: true
            })
          }
        })
    } else {
      this.setState({
        formError: true
      });
    }
  };

  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formData, 'brands')

    this.setState({
      formData: newFormData,
      formSuccess: true
    });
  }

  showCategoriesItems = () =>
    this.props.product.brands
      ? this.props.product.brands.map((item, i) => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Brand</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showCategoriesItems()}</div>
          </div>
          <div className="right">
            <form onSubmit={event => this.submitForm(event)}>
              <FormField
                id={"name"}
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
              />

              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}

              <button onClick={event => this.submitForm(event)}>
                Add brand
              </button>
            </form>
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

export default connect(mapStateToProps)(ManageBrands);
