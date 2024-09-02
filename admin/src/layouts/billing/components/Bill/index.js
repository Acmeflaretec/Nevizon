import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import Box from "components/Box";
import Typography from "components/Typography";
import Button from "components/Button";
import { useController } from "context";

function Bill({ name, company, email, vat, noGutter }) {
  const [controller] = useController();
  const { darkMode } = controller;

  return (
    <Box
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
      sx={({ palette: { grey, background } }) => ({
        backgroundColor: darkMode ? background.default : grey[100],
      })}
    >
      <Box width="100%" display="flex" flexDirection="column">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={1}
        >
          <Typography variant="button" fontWeight="medium" textTransform="capitalize">
            {name}
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <Box mr={1}>
              <Button variant="text" color="error">
                <Icon>delete</Icon>&nbsp;Delete
              </Button>
            </Box>
            <Button variant="text" color="dark">
              <Icon>edit</Icon>&nbsp;Edit
            </Button>
          </Box>
        </Box>
        <Box mb={1} lineHeight={0}>
          <Typography variant="caption" color="text">
            Company Name:&nbsp;&nbsp;&nbsp;
            <Typography variant="caption" fontWeight="medium" textTransform="capitalize">
              {company}
            </Typography>
          </Typography>
        </Box>
        <Box mb={1} lineHeight={0}>
          <Typography variant="caption" color="text">
            Email Address:&nbsp;&nbsp;&nbsp;
            <Typography variant="caption" fontWeight="medium">
              {email}
            </Typography>
          </Typography>
        </Box>
        <Typography variant="caption" color="text">
          VAT Number:&nbsp;&nbsp;&nbsp;
          <Typography variant="caption" fontWeight="medium">
            {vat}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Bill;
