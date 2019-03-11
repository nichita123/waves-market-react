import React, { Component } from "react";

import MyButton from "../utils/button";

class Card extends Component {
  renderCardImage(images) {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_available.png";
    }
  }

  render() {
    const props = this.props;
    return (
      <div className={`card_item_wrapper ${props.grid}`}>
        <div
          className="image"
          style={{
            background: `url(${this.renderCardImage(
              props.images
            )}) no-repeat center`
          }}
        />
        <div className="action_container">
          <div className="tags">
            <div className="brand">{props.brand.name}</div>
            <div className="name">{props.name}</div>
            <div className="price">${props.price}</div>
          </div>

          {props.grid ? (
            <div className="description">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore tenetur quos, praesentium quasi molestiae omnis aliquid ratione aspernatur aut, fugiat, ut magnam. Placeat temporibus labore modi mollitia, tempora, nobis sed voluptatum aut, fugiat exercitationem saepe vitae corporis voluptas ducimus possimus?
            </div>
          ) : null}
          <div className="actions">
            <div className="button_wrap">
              <MyButton
                type="default"
                altClass="card_link"
                title="View product"
                linkTo={`/product/detail/${props._id}`}
                addStyles={{
                  margin: "10px 0 0 0"
                }}
              />
            </div>

            <div className="button_wrap">
              <MyButton
                type="bag_link"
                runAction={() => {
                  console.log("add to cart");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
