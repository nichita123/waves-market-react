import React from "react";

import MyButton from "../utils/button";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTruck from "@fortawesome/fontawesome-free-solid/faTruck";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";

const ProductNFO = props => {
  const showProductTags = detail => (
    <div className="product_tags">
      {detail.shipping ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div className="tag_text">
            <div>Free shipping</div>
            <div>and return</div>
          </div>
        </div>
      ) : null}
      {detail.available ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <div className="tag_text">
            <div>Available</div>
            <div>in Store</div>
          </div>
        </div>
      ) : (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="tag_text">
            <div>Not available</div>
            <div>Pre-order only</div>
          </div>
        </div>
      )}
    </div>
  );

  const showProductActions = (detail) => (
    <div className="product_actions">
      <div className="price">
        $ { detail.price }
      </div>
      <div className="cart">
        <MyButton 
          type="add_to_cart_link"
          runAction={() => {
            props.addToCart(detail._id)
          }}
        />
      </div>
    </div>
  )

  const showProductSpecs = (detail) => (
    <div className="product_specifications">
      <h2>Specs:</h2>
      <div>
        <div className="item">
          <strong>Frets: </strong> { detail.frets }
        </div>
        <div className="item">
          <strong>Wood: </strong> { detail.wood.name }
        </div>
      </div>
    </div>
  )

  const { detail } = props;

  return (
    <div>
      <h1>
        {detail.brand.name} {detail.name}
      </h1>
      <p>{detail.desc}</p>
      { showProductTags(detail) }
      { showProductActions(detail) }
      { showProductSpecs(detail) }
    </div>
  );
};

export default ProductNFO;
