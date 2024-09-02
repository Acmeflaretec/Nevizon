import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";
import Avatar from "components/Avatar";
import Button from "components/Button";

function ProfilesList({ title, profiles }) {
  const renderProfiles = profiles.map(({ image, name, description, action }) => (
    <Box key={name} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <Box mr={2}>
        <Avatar src={image} alt="something here" variant="rounded" shadow="md" />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Typography variant="button" fontWeight="medium">
          {name}
        </Typography>
        <Typography variant="caption" color="text">
          {description}
        </Typography>
      </Box>
      <Box ml="auto">
        {action.type === "internal" ? (
          <Button component={Link} to={action.route} variant="text" color="info">
            {action.label}
          </Button>
        ) : (
          <Button
            component="a"
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant="text"
            color={action.color}
          >
            {action.label}
          </Button>
        )}
      </Box>
    </Box>
  ));

  return (
    <Card sx={{ height: "100%" }}>
      <Box pt={2} px={2}>
        <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </Typography>
      </Box>
      <Box p={2}>
        <Box component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </Box>
      </Box>
    </Card>
  );
}

// Typechecking props for the ProfilesList
ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProfilesList;
