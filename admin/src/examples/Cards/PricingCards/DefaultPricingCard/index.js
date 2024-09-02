import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Box from "components/Box";
import Typography from "components/Typography";
import Button from "components/Button";

function DefaultPricingCard({ title, price, specifications, action }) {
  const renderSpecifications = specifications.map(({ label, includes }) => (
    <Box key={label} display="flex" alignItems="center" p={1}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="1.5rem"
        height="1.5rem"
        borderRadius="50%"
        shadow="md"
        bgColor={includes ? "success" : "secondary"}
        variant="gradient"
        mr={2}
      >
        <Typography variant="button" color="white" sx={{ lineHeight: 0 }}>
          <Icon sx={{ fontWeight: "bold" }}>{includes ? "done" : "remove"}</Icon>
        </Typography>
      </Box>
      <Typography variant="body2" color="text">
        {label}
      </Typography>
    </Box>
  ));

  return (
    <Card>
      <Box pt={3} pb={2} px={2} textAlign="center">
        <Typography variant="body2" color="dark" textTransform="uppercase" fontWeight="medium">
          {title}
        </Typography>
        <Box my={1}>
          <Typography variant="h1">
            <Typography display="inline" component="small" variant="h2">
              {price.currency}
            </Typography>
            {price.value}
          </Typography>
        </Box>
      </Box>
      <Box pb={3} px={3}>
        {renderSpecifications}
        {action.type === "internal" ? (
          <Box mt={3}>
            <Button component={Link} to={action.route} color={action.color} fullWidth>
              {action.label}&nbsp;
              <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
            </Button>
          </Box>
        ) : (
          <Box mt={3}>
            <Button
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              color={action.color}
              fullWidth
            >
              {action.label}&nbsp;
              <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
}

// Typechecking props for the DefaultPricingCard
DefaultPricingCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.shape({
    currency: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  specifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
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
  }).isRequired,
};

export default DefaultPricingCard;
