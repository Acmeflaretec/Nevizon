import CountUp from "react-countup";
import PropTypes from "prop-types";
import Box from "components/Box";
import Typography from "components/Typography";

//  Dashboard 2 MUI base styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

function OutlinedCounterCard({ color, count, title, prefix, suffix }) {
  const { secondary } = colors;
  const { borderWidth } = borders;

  return (
    <Box
      borderRadius="md"
      border={`${borderWidth[1]} dashed ${secondary.main}`}
      textAlign="center"
      py={2}
    >
      <Typography variant="h6" color={color} fontWeight="medium" textTransform="capitalize">
        {title}
      </Typography>
      <Typography variant="h4" fontWeight="bold">
        {prefix && (
          <Typography component="span" variant="h5" fontWeight="bold">
            {prefix}
          </Typography>
        )}
        <Box display="inline-block" color="inherit" mx={0.5}>
          <CountUp end={count} duration={1} separator="," />
        </Box>
        {suffix && (
          <Typography component="span" variant="h5" fontWeight="bold">
            {suffix}
          </Typography>
        )}
      </Typography>
    </Box>
  );
}

// Setting default values for the props of OutlinedCounterCard
OutlinedCounterCard.defaultProps = {
  color: "info",
  prefix: "",
  suffix: "",
};

// Typechecking props for the BlogCard
OutlinedCounterCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default OutlinedCounterCard;
