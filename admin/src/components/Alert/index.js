import { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Fade from "@mui/material/Fade";

//  Dashboard 2 MUI components
import Box from "components/Box";

// Custom styles for the Alert
import AlertRoot from "components/Alert/AlertRoot";
import AlertCloseIcon from "components/Alert/AlertCloseIcon";

function Alert({ color, dismissible, children, ...rest }) {
  const [alertStatus, setAlertStatus] = useState("mount");

  const handleAlertStatus = () => setAlertStatus("fadeOut");

  // The base template for the alert
  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <AlertRoot ownerState={{ color }} {...rest}>
        <Box display="flex" alignItems="center" color="white">
          {children}
        </Box>
        {dismissible ? (
          <AlertCloseIcon onClick={mount ? handleAlertStatus : null}>
            &times;
          </AlertCloseIcon>
        ) : null}
      </AlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
}

// Setting default values for the props of Alert
Alert.defaultProps = {
  color: "info",
  dismissible: false,
};

// Typechecking props of the Alert
Alert.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  dismissible: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Alert;
