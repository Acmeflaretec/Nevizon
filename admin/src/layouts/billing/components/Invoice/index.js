import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import Box from "components/Box";
import Typography from "components/Typography";

function Invoice({ date, id, price, noGutter }) {
  return (
    <Box
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={noGutter ? 0 : 1}
    >
      <Box lineHeight={1.125}>
        <Typography display="block" variant="button" fontWeight="medium">
          {date}
        </Typography>
        <Typography variant="caption" fontWeight="regular" color="text">
          {id}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="button" fontWeight="regular" color="text">
          {price}
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          lineHeight={1}
          ml={3}
          sx={{ cursor: "pointer" }}
        >
          <Icon fontSize="small">picture_as_pdf</Icon>
          <Typography variant="button" fontWeight="bold">
            &nbsp;PDF
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

// Setting default values for the props of Invoice
Invoice.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Invoice
Invoice.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Invoice;
