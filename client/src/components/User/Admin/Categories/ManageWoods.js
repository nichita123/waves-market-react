import React, { Component } from "react";

import { connect } from "react-redux";

import FormField from "../../../utils/Form/FormField";
import {
  update,
  generateData,
  isFormValid,
  resetFields
} from "../../../utils/Form/formActions";

import { getWoods, addWood } from "../../../../redux/actions/product_actions";

class ManageWoods extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "wood_input",
          type: "text",
          placeholder: "Enter the wood material"
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
    this.props.dispatch(getWoods());
  }

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "woods");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "woods");
    let formIsValid = isFormValid(this.state.formData, "woods");
    let existingWoods = this.props.product.woods;

    if (formIsValid) {
      this.props.dispatch(addWood(dataToSubmit, existingWoods))
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
    const newFormData = resetFields(this.state.formData, 'woods')

    this.setState({
      formData: newFormData,
      formSuccess: true
    });
  }

  showCategoriesItems = (woods) =>
  woods
    ? woods.map((item, i) => (
        <div className="category_item" key={item._id}>
          {item.name}
        </div>
      ))
    : null;

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Wood</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showCategoriesItems(this.props.product.woods)}</div>
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
                Add wood
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(ManageWoods);
