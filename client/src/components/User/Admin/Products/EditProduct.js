import React, { Component } from "react";

import FormControl from "@material-ui/core/FormControl";

import UserLayout from "../../../../hoc/UserLayout";

import { connect } from "react-redux";

import FileUpload from "../../../utils/Form/FileUpload";

import FormField from "../../../utils/Form/FormField";
import {
  update,
  generateData,
  isFormValid,
  populateOptionFields,
  populateFields
} from "../../../utils/Form/formActions";

import {
  getBrands,
  getWoods,
  getProductDetail,
  updateProduct,
  clearUpdateProduct
} from "../../../../redux/actions/product_actions";

class EditProduct extends Component {
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

  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.dispatch(getBrands()).then(res => {
      const newFormData = populateOptionFields(
        this.state.formData,
        this.props.product.brands,
        "brand"
      );

      this.updateFields(newFormData);
    });

    this.props.dispatch(getWoods()).then(res => {
      const newFormData = populateOptionFields(
        this.state.formData,
        this.props.product.woods,
        "wood"
      );

      this.updateFields(newFormData);
    });

    this.props.dispatch(getProductDetail(id)).then(() => {
      const newFormData = populateFields(
        this.state.formData,
        this.props.product.productDetail
      );

      this.updateFields(newFormData);
    });
  }

  updateFields = newFormData => {
    this.setState({
      formData: newFormData
    });
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
      const id = this.props.match.params.id;

      try {
        this.props.dispatch(updateProduct(id, dataToSubmit)).then(() => {
          this.setState(
            {
              formSuccess: true
            },
            () => {
              setTimeout(() => {
                this.props.dispatch(clearUpdateProduct());
                this.setState({
                  formSuccess: false
                });
                this.props.history.push('/admin/products');
              }, 1500);
            }
          );
        });
      } catch (error) {
        this.setState({
          formError: true
        });
      }
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
          <h1>Edit Product</h1>

          <form onSubmit={event => this.submitForm(event)}>
            <FormControl fullWidth>
              <FileUpload
                imagesHandler={images => this.imagesHandler(images)}
                uploadedImages={this.state.formData.images.value}
                edit={true}
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
                Edit product
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

export default connect(mapStateToProps)(EditProduct);
