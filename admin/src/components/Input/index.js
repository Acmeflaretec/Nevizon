import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for Input
import InputRoot from "components/Input/InputRoot";

//  Dashboard 2 MUI context
import { useController } from "context";

const Input = forwardRef(({ size, error, success, disabled, ...rest }, ref) => {
  const [controller] = useController();
  const { darkMode } = controller;

  return (
    <InputRoot {...rest} ref={ref} ownerState={{ size, error, success, disabled, darkMode }} />
  );
});

// Setting default values for the props of Input
Input.defaultProps = {
  size: "medium",
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the Input
Input.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Input;
