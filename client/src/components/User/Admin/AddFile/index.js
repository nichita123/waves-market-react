import React, { Component } from "react";

import UserLayout from "../../../../hoc/UserLayout";

import Dropzone from "react-dropzone";

import { Link } from "react-router-dom";

import axios from "axios";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";

import CircularProgress from "@material-ui/core/CircularProgress";

class AddFile extends Component {
  state = {
    formSuccess: false,
    formError: false,
    isUploading: false,
    files: []
  };

  onDrop(files) {
    this.setState({
      isUploading: true
    });

    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" }
    };
    formData.append("file", files[0]);

    axios.post("/api/admin/upload-file", formData, config).then(res => {
      if (res.data.success) {
        this.setState(
          {
            formSuccess: true,
            formError: false,
            isUploading: false
          },
          () => {
            setTimeout(() => {
              this.setState({
                formSuccess: false
              });
            }, 2000);
          }
        );
      }
    });
  }

  componentDidMount() {
    axios.get("/api/admin/files").then(res => {
      this.setState({
        files: res.data
      });
    });
  }

  showFileList = (files) => (
    files 
      ? files.map((item, i) => (
        <li key={i}>
          <Link to={`/api/admin/download/${item}`} target="_blank"> 
            {item}
          </Link>
        </li>
      ))
      : null
  )

  render() {
    return (
      <UserLayout>
        <h1>Upload file</h1>
        <div>
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
          <div style={{ clear: "both" }}>
            {this.state.formSuccess ? (
              <div className="form_success">Success</div>
            ) : null}
            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}
          </div>
          <hr />
          <div>
            <ul>
              {this.showFileList(this.state.files)}
            </ul>
          </div>
        </div>
      </UserLayout>
    );
  }
}

export default AddFile;
