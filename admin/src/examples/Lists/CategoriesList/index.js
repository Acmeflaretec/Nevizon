import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Box from "components/Box";
import Typography from "components/Typography";

function CategoriesList({ title, categories }) {
  const renderItems = categories.map(({ color, icon, name, description, route }, key) => (
    <Box
      key={name}
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="lg"
      py={1}
      pr={2}
      mb={categories.length - 1 === key ? 0 : 1}
    >
      <Box display="flex" alignItems="center">
        <Box
          display="grid"
          alignItems="center"
          justifyContent="center"
          bgColor={color}
          borderRadius="lg"
          shadow="md"
          color="white"
          width="2rem"
          height="2rem"
          mr={2}
          variant="gradient"
        >
          <Icon
            sx={{
              display: "grid",
              placeItems: "center",
            }}
          >
            {icon}
          </Icon>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="button" color={color} fontWeight="medium" gutterBottom>
            {name}
          </Typography>
          <Typography variant="caption" color="text">
            {description}
          </Typography>
        </Box>
      </Box>
      <Box display="flex">
        <Typography
          component={Link}
          variant="button"
          color={color}
          to={route}
          sx={{
            lineHeight: 0,
            transition: "all 0.2s cubic-bezier(.34,1.61,.7,1.3)",
            p: 0.5,

            "&:hover, &:focus": {
              transform: "translateX(5px)",
            },
          }}
        >
          <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
        </Typography>
      </Box>
    </Box>
  ));

  return (
    <Card>
      <Box pt={2} px={2}>
        <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </Typography>
      </Box>
      <Box p={2}>
        <Box component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderItems}
        </Box>
      </Box>
    </Card>
  );
}

// Typechecking props for the CategoriesList
CategoriesList.propTypes = {
  title: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoriesList;
