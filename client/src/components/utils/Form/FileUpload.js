import React, { Component } from "react";

import Dropzone from "react-dropzone";

import axios from "axios";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";

import CircularProgress from "@material-ui/core/CircularProgress";

class FileUpload extends Component {
  state = {
    uploadedFiles: [],
    isUploading: false,
    editImages: [],
    edit: false
  };

  static getDerivedStateFromProps(props, state) {
    if (props.edit === true) {
      if (props.uploadedImages) {
        return (state = {
          editImages: [...props.uploadedImages],
          edit: props.edit
        });
      }
    }
    if (props.reset) {
      return (state = {
        uploadedFiles: []
      });
    }
    return null;
  }

  setImagesToState = (images, res) => {
    this.setState(
      {
        isUploading: false,
        uploadedFiles: [...images, res.data]
      },
      () => {
        this.props.imagesHandler(this.state.uploadedFiles);
      }
    );
  };

  onDrop = files => {
    this.setState({
      isUploading: true
    });
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" }
    };
    formData.append("file", files[0]);

    axios.post("/api/admin/upload-image", formData, config).then(res => {
      if (this.state.edit) {
        this.setImagesToState(this.state.editImages, res);
      } else {
        this.setImagesToState(this.state.uploadedFiles, res);
      }
    });
  };

  onRemove = (id, edit) => {
    axios.get(`/api/admin/remove-image?public_id=${id}`).then(res => {
      let images = edit
        ? this.state.editImages.filter(item => {
            return item.public_id !== id;
          })
        : this.state.uploadedFiles.filter(item => {
            return item.public_id !== id;
          });

      if(edit){
        this.setState({
          editImages: images,
          uploadedFiles: images
        }, () => {
          this.props.imagesHandler(images);
        })
      }else{
        this.setState({
          uploadedFiles: images
        }, () => {
          this.props.imagesHandler(images);
        })
      }
    });
  };

  showUploadedImages = images =>
    images.map(item => (
      <div
        className="dropzone_box"
        key={item.public_id}
        onClick={() => this.onRemove(item.public_id, this.state.edit)}
      >
        <div
          className="wrap"
          style={{
            background: `url(${item.url}) no-repeat center`
          }}
        />
      </div>
    ));

  render() {
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <Dropzone
              onDrop={event => this.onDrop(event)}
              multiple={false}
              className="dropzone_box"
              style={{
                cursor: "pointer"
              }}
            >
              <div className="wrap">
                <FontAwesomeIcon icon={faPlusCircle} />
              </div>
            </Dropzone>
            {this.state.edit
              ? this.showUploadedImages(this.state.editImages)
              : this.showUploadedImages(this.state.uploadedFiles)}
            {this.state.isUploading ? (
              <div
                className="dropzone_box"
                style={{
                  textAlign: "center",
                  paddingTop: "60px"
                }}
              >
                <CircularProgress
                  style={{
                    color: "#00bcd4"
                  }}
                  thickness={7}
                />
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}

export default FileUpload;
