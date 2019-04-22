import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";
import faRedo from "@fortawesome/fontawesome-free-solid/faRedo";

import moment from "moment";

const ProductBlock = ({
   products, removeItem, editProduct, type 
}) => {
  const renderCartImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_available.png";
    }
  };

  const renderСartItems = () =>
    products.cartDetail
      ? products.cartDetail.map(product => (
          <tr key={product._id}>
            <td className="table_image">
              <img
                className="image"
                src={renderCartImage(product.images)}
                alt="Product"
              />
            </td>
            <td className="product_info">
              <h4>{product.name}</h4>
              <dl className="characteristics">
                <dt>Brand: </dt>
                <dd>{product.brand.name}</dd>
              </dl>
              <dl className="characteristics">
                <dt>Wood: </dt>
                <dd>{product.wood.name}</dd>
              </dl>
              <dl className="characteristics">
                <dt>Frets: </dt>
                <dd>{product.frets}</dd>
              </dl>
            </td>
            <td className="quantity ta_center">{product.quantity}</td>
            <td className="price ta_center">
              ${product.price * product.quantity}
            </td>
            <td className="remove ta_center">
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => removeItem(product._id)}
              />
            </td>
          </tr>
        ))
      : null;

  const renderAllProducts = () =>
    products.toShop
      ? products.toShop.map(product => (
          <tr key={product._id}>
            <td
              width="20%"
              className="table_image"
              style={{
                minWidth: "58px"
              }}
            >
              <img
                className="image"
                src={renderCartImage(product.images)}
                alt="Product"
              />
            </td>
            <td width="20%" className="product_info">
              <h4>{product.name}</h4>

              <dl className="characteristics">
                <dt>Brand: </dt>
                <dd>{product.brand.name}</dd>
              </dl>
              <dl className="characteristics">
                <dt>Wood: </dt>
                <dd>{product.wood.name}</dd>
              </dl>
              <dl className="characteristics">
                <dt>Frets: </dt>
                <dd>{product.frets}</dd>
              </dl>
            </td>
            <td width="28%">
              <dl className="characteristics">
                <dt>Sold: </dt>
                <dd>{product.sold}</dd>
              </dl>
              <dl className="characteristics">
                <dt>Shipping: </dt>
                <dd>{product.shipping ? "Available" : "Not Available"}</dd>
              </dl>
              <dl className="characteristics">
                <dt>Availability: </dt>
                <dd>{product.available ? "In stock" : "Not in stock"}</dd>
              </dl>
            </td>
            <td width="28%" className="product_info">
              <dl className="characteristics">
                <dt>Created: </dt>
                <dd>{moment(product.createdAt).format("MM-DD-YYYY")}</dd>
              </dl>
              <dl className="characteristics">
                <dt>Updated: </dt>
                <dd>{moment(product.updatedAt).format("MM-DD-YYYY")}</dd>
              </dl>
            </td>
            <td width="2%" className="price ta_center">
              <p>${product.price}</p>
            </td>
            <td width="2%" className="remove ta_center">
              <div className="action_wrapper">
                <div className="up">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => removeItem(product._id)}
                  />
                </div>
                <div className="down">
                  <FontAwesomeIcon
                    icon={faRedo}
                    onClick={() => editProduct(product._id)}
                  />
                </div>
              </div>
            </td>
          </tr>
        ))
      : null;

  const renderItems = () => {
    let productTemplate = null;

    switch (type) {
      case "cart":
        productTemplate = (
          <React.Fragment>
            {products.userData.cart.length > 0 ? (
              <table className="cart_table">
                <thead className="cart_table_header">
                  <tr>
                    <th colSpan="2" style={{ textAlign: "left" }}>
                      Item
                    </th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody className="cart_table_body">{renderСartItems()}</tbody>
              </table>
            ) : null}
          </React.Fragment>
        );
        break;

      case "all_products":
        productTemplate = (
          <React.Fragment>
            {products.toShopSize > 0 ? (
              <table className="cart_table">
                <thead className="cart_table_header">
                  <tr>
                    <th colSpan="4" className="cart_table_th">
                      Item
                    </th>
                    <th className="cart_table_th">Price</th>
                    <th className="cart_table_th">Actions</th>
                  </tr>
                </thead>
                <tbody className="cart_table_body">{renderAllProducts()}</tbody>
              </table>
            ) : null}
          </React.Fragment>
        );
        break;

      default:
        productTemplate = null;
    }

    return productTemplate;
  };

  return <div>{renderItems()}</div>;
};

export default ProductBlock;
