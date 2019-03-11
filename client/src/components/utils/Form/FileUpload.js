import React, { Component } from 'react';

import Dropzone from 'react-dropzone';

import axios from 'axios';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';

import CircularProgress from '@material-ui/core/CircularProgress';

class FileUpload extends Component {
  state = {
    uploadedFiles: [],
    isUploading: false
  }

  onDrop = (files) => {
    this.setState({
      isUploading: true
    })
    let formData = new FormData();
    const config = {
      header: {'content-type': 'multipart/form-data'}
    }
    formData.append('file', files[0]);

    axios.post('/api/admin/upload-image', formData, config)
      .then((res) => {
        this.setState({
          isUploading: false,
          uploadedFiles: [
            ...this.state.uploadedFiles,
            res.data
          ]
        }, () => {
          this.props.imagesHandler(this.state.uploadedFiles)
        })
      })
  }

  onRemove = (id) => {
    axios.get(`/api/admin/remove-image?public_id=${id}`)
      .then(res => {
        let images = this.state.uploadedFiles.filter(item => {
          return item.public_id !== id;
        })

        this.setState({
          uploadedFiles: images
        }, () => {
          this.props.imagesHandler(images)
        })
      })
  }

  showUploadedImages = () => (
    this.state.uploadedFiles.map(item => (
      <div 
        className="dropzone_box" 
        key={item.public_id}
        onClick={() => this.onRemove(item.public_id)}
      >
        <div 
          className="wrap"
          style={{
            background: `url(${item.url}) no-repeat center`
          }}
        />
      </div>
    ))
  )

  static getDerivedStateFromProps(props, state) {
    if(props.reset){
      return state = {
        uploadedFiles: []
      }
    }
    return null;
  }
  
    

  render() {
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <Dropzone
              onDrop={(event) => this.onDrop(event)}
              multiple={false}
              className="dropzone_box"
              style={{
                cursor: 'pointer'
              }}
            >
              <div className="wrap">
                <FontAwesomeIcon 
                  icon={faPlusCircle}
                />
              </div>
            </Dropzone>
              { this.showUploadedImages() }
              {
                this.state.isUploading
                  ? <div className="dropzone_box" style={{
                      textAlign: 'center',
                      paddingTop: '60px'
                    }}>
                      <CircularProgress 
                        style={{
                          color: '#00bcd4'
                        }}
                        thickness={7}
                      />
                    </div>
                  : null
              }
          </div>
        </section>
      </div>
    );
  }
}

export default FileUpload;