import React, { Component } from "react";

import FormControl from "@material-ui/core/FormControl";

import UserLayout from "../../../../hoc/UserLayout";

import FormField from "../../../utils/Form/FormField";
import {
  update,
  generateData,
  isFormValid,
  populateOptionFields,
  resetFields
} from "../../../utils/Form/formActions";

import FileUpload from "../../../utils/Form/FileUpload";

import { connect } from "react-redux";

import {
  getBrands,
  getWoods,
  addProduct,
  clearProduct
} from "../../../../redux/actions/product_actions";

class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          label: "Product name",
          type: "text",
          placeholder: "Enter product name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      desc: {
        element: "textarea",
        value: "",
        config: {
          name: "description_input",
          label: "Product description",
          type: "text",
          placeholder: "Enter description"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      price: {
        element: "input",
        value: "",
        config: {
          name: "price_input",
          label: "Product price",
          type: "number",
          placeholder: "Enter the price"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      brand: {
        element: "select",
        value: "",
        config: {
          name: "brand_input",
          label: "Product brand",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      shipping: {
        element: "select",
        value: "",
        config: {
          name: "shipping_input",
          label: "Shipping",
          options: [{ key: true, value: "Yes" }, { key: false, value: "No" }]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      available: {
        element: "select",
        value: "",
        config: {
          name: "available_input",
          label: "Available in stock",
          options: [{ key: true, value: "Yes" }, { key: false, value: "No" }]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      wood: {
        element: "select",
        value: "",
        config: {
          name: "wood_input",
          label: "Wood",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      frets: {
        element: "select",
        value: "",
        config: {
          name: "frets_input",
          label: "Frets",
          options: [
            { key: 20, value: "20" },
            { key: 21, value: "21" },
            { key: 22, value: "22" },
            { key: 24, value: "24" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      publish: {
        element: "select",
        value: "",
        config: {
          name: "publish_input",
          label: "Publish",
          options: [
            { key: true, value: "Public" },
            { key: false, value: "Hidden" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      images: {
        value: [],
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: "",
        showLabel: false
      }
    }
  };

  updateFields = newFormData => {
    this.setState({
      formData: newFormData
    });
  };

  componentDidMount() {
    const formData = this.state.formData;

    this.props.dispatch(getBrands()).then(res => {
      const newFormData = populateOptionFields(
        formData,
        this.props.product.brands,
        "brand"
      );

      this.updateFields(newFormData);
    });

    this.props.dispatch(getWoods()).then(res => {
      const newFormData = populateOptionFields(
        formData,
        this.props.product.woods,
        "wood"
      );

      this.updateFields(newFormData);
    });
  }

  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formData, "products");

    this.setState({
      formData: newFormData,
      formSuccess: true
    });

    setTimeout(() => {
      this.setState(
        {
          formSuccess: false
        },
        () => {
          this.props.dispatch(clearProduct());
        }
      );
    }, 3000);
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "products");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "products");
    let formIsValid = isFormValid(this.state.formData, "products");

    if (formIsValid) {
      this.props.dispatch(addProduct(dataToSubmit)).then(() => {
        if (this.props.product.addProduct.success) {
          this.resetFieldsHandler();
        } else {
          this.setState({
            formError: true
          });
        }
      });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  imagesHandler = images => {
    const newFormData = {
      ...this.state.formData
    };

    newFormData["images"].value = images;
    newFormData["images"].valid = true;

    this.setState({
      formData: newFormData
    });
  };

  render() {
    return (
      <UserLayout>
        <div>
          <h1>Add product</h1>

          <form onSubmit={event => this.submitForm(event)}>
            <FormControl fullWidth>
              <FileUpload
                imagesHandler={images => this.imagesHandler(images)}
                reset={this.state.formSuccess}
                edit={false}
              />

              <FormField
                id={"name"}
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={"desc"}
                formData={this.state.formData.desc}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={"price"}
                formData={this.state.formData.price}
                change={element => this.updateForm(element)}
              />

              <div className="form_devider" />

              <FormField
                id={"brand"}
                formData={this.state.formData.brand}
                change={element => this.updateForm(element)}
              />

              <FormField
                id={"shipping"}
                formData={this.state.formData.shipping}
                change={element => this.updateForm(element)}
              />

              <FormField
                id={"available"}
                formData={this.state.formData.available}
                change={element => this.updateForm(element)}
              />

              <div className="form_devider" />

              <FormField
                id={"wood"}
                formData={this.state.formData.wood}
                change={element => this.updateForm(element)}
              />

              <FormField
                id={"frets"}
                formData={this.state.formData.frets}
                change={element => this.updateForm(element)}
              />

              <div className="form_devider" />

              <FormField
                id={"publish"}
                formData={this.state.formData.publish}
                change={element => this.updateForm(element)}
              />

              {this.state.formSuccess ? (
                <div className="form_success">Success</div>
              ) : null}

              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}

              <button onClick={event => this.submitForm(event)}>
                Add product
              </button>
            </FormControl>
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  };
};

export default connect(mapStateToProps)(AddProduct);
