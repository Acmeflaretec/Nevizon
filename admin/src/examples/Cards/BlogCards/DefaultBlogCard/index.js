import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";
import Box from "components/Box";
import Typography from "components/Typography";
import Avatar from "components/Avatar";

function DefaultBlogCard({ image, category, title, description, author, action }) {
  return (
    <Card>
      <Box mt={2} mx={2}>
        {action.type === "internal" ? (
          <Link to={action.route}>
            <Box component="img" src={image} alt={title} width="100%" borderRadius="lg" />
          </Link>
        ) : (
          <MuiLink href={action.route} target="_blank" rel="noreferrer">
            <Box component="img" src={image} alt={title} width="100%" borderRadius="lg" />
          </MuiLink>
        )}
      </Box>
      <Box pb={3} px={3}>
        {category && (
          <Typography
            variant="caption"
            color={category.color}
            textTransform="uppercase"
            fontWeight="medium"
            textGradient
          >
            {category.label}
          </Typography>
        )}
        <Box display="block" mt={0.5} mb={1}>
          {action.type === "internal" ? (
            <Link to={action.route}>
              <Typography
                display="inline"
                variant="h5"
                textTransform="capitalize"
                className="color-background"
              >
                {title}
              </Typography>
            </Link>
          ) : (
            <MuiLink href={action.route} target="_blank" rel="noreferrer">
              <Typography
                display="inline"
                variant="h5"
                textTransform="capitalize"
                className="color-background"
              >
                {title}
              </Typography>
            </MuiLink>
          )}
        </Box>
        <Typography variant="body2" component="p" color="text">
          {description}
        </Typography>
        {author && (
          <Box display="flex" alignItems="center" mt={3}>
            <Avatar variant="rounded" src={author.image} alt={author.name} shadow="md" />
            <Box pl={2} lineHeight={0}>
              <Typography component="h6" variant="button" fontWeight="medium" gutterBottom>
                {author.name}
              </Typography>
              <Typography variant="caption" color="text">
                {author.date}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Card>
  );
}

// Setting default props for the DefaultBlogCard
DefaultBlogCard.defaultProps = {
  category: false,
  author: false,
};

// Typechecking props for the DefaultBlogCard
DefaultBlogCard.propTypes = {
  image: PropTypes.string.isRequired,
  category: PropTypes.oneOfType([
    PropTypes.shape({
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
      ]).isRequired,
      label: PropTypes.string.isRequired,
    }),
    PropTypes.bool,
  ]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.oneOfType([
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    }),
    PropTypes.bool,
  ]),
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
  }).isRequired,
};

export default DefaultBlogCard;
