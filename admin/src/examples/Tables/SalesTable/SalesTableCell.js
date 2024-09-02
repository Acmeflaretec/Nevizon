import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import Typography from "components/Typography";
import Box from "components/Box";

function SalesTableCell({ title, content, image, noBorder, ...rest }) {
  let template;

  if (image) {
    template = (
      <TableCell {...rest} align="left" width="30%" sx={{ border: noBorder && 0 }}>
        <Box display="flex" alignItems="center" width="max-content">
          <Box component="img" src={image} alt={content} width="1.5rem" height="auto" />{" "}
          <Box display="flex" flexDirection="column" ml={3}>
            <Typography
              variant="caption"
              color="text"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {title}:
            </Typography>
            <Typography variant="button" fontWeight="medium" textTransform="capitalize">
              {content}
            </Typography>
          </Box>
        </Box>
      </TableCell>
    );
  } else {
    template = (
      <TableCell {...rest} align="center" sx={{ border: noBorder && 0 }}>
        <Box display="flex" flexDirection="column">
          <Typography
            variant="caption"
            color="text"
            fontWeight="medium"
            textTransform="capitalize"
          >
            {title}:
          </Typography>
          <Typography variant="button" fontWeight="medium" textTransform="capitalize">
            {content}
          </Typography>
        </Box>
      </TableCell>
    );
  }

  return template;
}

// Setting default values for the props of SalesTableCell
SalesTableCell.defaultProps = {
  image: "",
  noBorder: false,
};

// Typechecking props for the SalesTableCell
SalesTableCell.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  noBorder: PropTypes.bool,
};

export default SalesTableCell;
