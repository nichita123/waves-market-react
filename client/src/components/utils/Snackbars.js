import React from 'react';

import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

const MySnackbarContentWrapper = (props) => {
    const variantIcon = {
      success: CheckCircleIcon,
      warning: WarningIcon,
      error: ErrorIcon,
      info: InfoIcon,
    };

    const { className, message, onClose, variant ,addStyles,addPadding, onLogin, ...other } = props;
    const Icon = variantIcon[variant];
  
    return (
      <SnackbarContent
        aria-describedby="client-snackbar"
        onClick={onLogin}
        message={
          <span id="client-snackbar" style={{...addStyles}}>
            <Icon  style={{...addPadding}}/>
            {message}
          </span>
        }
        className={variant}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
        {...other}
      />
    );
  }

export default MySnackbarContentWrapper;