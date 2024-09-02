import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

//  Dashboard 2 MUI components
import Box from "components/Box";
import Typography from "components/Typography";
import Button from "components/Button";

function Transaction({ color, icon, name, description, value }) {
  return (
    <Box key={name} component="li" py={1} pr={2} mb={1}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <Box mr={2}>
            <Button variant="outlined" color={color} size="small" iconOnly circular>
              <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
            </Button>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="button" fontWeight="medium" gutterBottom>
              {name}
            </Typography>
            <Typography variant="caption" color="text">
              {description}
            </Typography>
          </Box>
        </Box>
        <Typography variant="button" color={color} fontWeight="medium" textGradient>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

// Typechecking props of the Transaction
Transaction.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]).isRequired,
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Transaction;
