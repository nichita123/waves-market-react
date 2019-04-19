import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";

const ProductBlock = ({ products, removeItem }) => {
  const renderCartImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_available.png";
    }
  };

  const renderItems = () =>
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
              {" "}
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

  return (
    <React.Fragment>
      {products.userData.cart.length > 0 ? (
        <table className="cart_table">
          <thead className="cart_table_header">
            <tr>
              <th colSpan="2" className="cart_table_th">
                Item
              </th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody className="cart_table_body">{renderItems()}</tbody>
        </table>
      ) : null}
    </React.Fragment>
  );
};

export default ProductBlock;
