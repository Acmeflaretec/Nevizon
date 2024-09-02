import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

//  Dashboard 2 MUI components
import Typography from "components/Typography";

// Custom styles for Progress
import ProgressRoot from "components/Progress/ProgressRoot";

const Progress = forwardRef(({ variant, color, value, label, ...rest }, ref) => (
  <>
    {label && (
      <Typography variant="button" fontWeight="medium" color="text">
        {value}%
      </Typography>
    )}
    <ProgressRoot
      {...rest}
      ref={ref}
      variant="determinate"
      value={value}
      ownerState={{ color, value, variant }}
    />
  </>
));

// Setting default values for the props of Progress
Progress.defaultProps = {
  variant: "contained",
  color: "info",
  value: 0,
  label: false,
};

// Typechecking props for the Progress
Progress.propTypes = {
  variant: PropTypes.oneOf(["contained", "gradient"]),
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
  value: PropTypes.number,
  label: PropTypes.bool,
};

export default Progress;
