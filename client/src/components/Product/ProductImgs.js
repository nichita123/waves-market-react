import React, { Component } from "react";

import ImageLightBox from '../utils/light_box';

class ProductImgs extends Component {
  state = {
    lightBox: false,
    imagePos: 0,
    lightBoxImages: []
  };

  componentDidMount() {
    if (this.props.detail.images.length > 0) {
      let lightBoxImages = [];

      this.props.detail.images.forEach(item => {
        lightBoxImages.push(item.url);
      });

      this.setState({
        lightBoxImages
      });
    }
  }

  renderCardImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return `/images/image_not_available.png`;
    }
  };

  handleLightBox = pos => {
    if (this.state.lightBoxImages.length > 0) {
      this.setState({
        lightBox: true,
        imagePos: pos
      });
    }
  };

  handleLightBoxClose = () => {
    this.setState({
      lightBox: false
    });
  };

  showThumbs = () =>
    this.state.lightBoxImages.map((item, i) =>
      i > 0 ? (
        <div
          key={i}
          onClick={() => this.handleLightBox(i)}
          className="thumb"
          style={{ background: `url(${item}) no-repeat` }}
        />
      ) : null
    );

  render() {
    const { detail } = this.props;
    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{
              background: `url(${this.renderCardImage(
                detail.images
              )}) no-repeat`
            }}
            onClick={() => this.handleLightBox(0)}
          />
        </div>
        <div className="main_thumbs">{this.showThumbs(detail)}</div>
        {this.state.lightBox
          ? <ImageLightBox 
              id={detail.id}
              images={this.state.lightBoxImages}
              open={this.state.open}
              pos={this.state.imagePos}
              onclose={() => this.handleLightBoxClose()}
            />
          : null
        }
      </div>
    );
  }
}

export default ProductImgs;
