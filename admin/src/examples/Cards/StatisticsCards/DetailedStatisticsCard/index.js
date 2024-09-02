import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Box from "components/Box";
import Typography from "components/Typography";
import { useController } from "context";

function DetailedStaticsCard({ bgColor, title, count, percentage, icon, direction }) {
  const [controller] = useController();
  const { darkMode } = controller;

  return (
    <Card>
      <Box
        bgColor={bgColor === "white" && darkMode ? "transparent" : bgColor}
        variant={bgColor === "white" && darkMode ? "contained" : "gradient"}
      >
        <Box p={2}>
          <Grid container>
            {direction === "left" ? (
              <Grid item>
                <Box
                  variant="gradient"
                  bgColor={bgColor === "white" ? icon.color : "white"}
                  color={bgColor === "white" ? "white" : "dark"}
                  width="3rem"
                  height="3rem"
                  borderRadius="section"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  {typeof icon.component === "string" ? (
                    <Icon fontSize="small" color="inherit">
                      {icon.component}
                    </Icon>
                  ) : (
                    <Box
                      fontSize="1.125rem"
                      display="grid"
                      placeItems="center"
                      color="inherit"
                    >
                      {icon.component}
                    </Box>
                  )}
                </Box>
              </Grid>
            ) : null}
            <Grid item xs={8}>
              <Box ml={direction === "left" ? 2 : 0} lineHeight={1}>
                <Typography
                  variant="button"
                  color={bgColor === "white" ? "text" : "white"}
                  textTransform="uppercase"
                  fontWeight="medium"
                >
                  {title}
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={bgColor === "white" ? "dark" : "white"}
                  mb={1}
                >
                  {count}
                </Typography>
              </Box>
            </Grid>
            {direction === "right" ? (
              <Grid item xs={4}>
                <Box
                  variant="gradient"
                  bgColor={bgColor === "white" ? icon.color : "white"}
                  color={bgColor === "white" ? "white" : "dark"}
                  width="3rem"
                  height="3rem"
                  borderRadius="section"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  ml="auto"
                >
                  {typeof icon.component === "string" ? (
                    <Icon fontSize="small" color="inherit">
                      {icon.component}
                    </Icon>
                  ) : (
                    <Box
                      fontSize="1.125rem"
                      display="grid"
                      placeItems="center"
                      color="inherit"
                    >
                      {icon.component}
                    </Box>
                  )}
                </Box>
              </Grid>
            ) : null}
          </Grid>
          <Typography
            display="flex"
            alignItems="center"
            variant="button"
            fontWeight="bold"
            color={percentage.color}
          >
            {percentage.count}
            <Typography
              variant="body2"
              fontWeight="regular"
              color={bgColor === "white" ? "text" : "white"}
              ml={0.5}
              mt={-0.125}
            >
              {percentage.text}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

// Setting default values for the props of DetailedStaticsCard
DetailedStaticsCard.defaultProps = {
  bgColor: "white",
  percentage: {
    color: "success",
    count: 0,
    text: "",
  },
  direction: "right",
};

// Typechecking props for the DetailedStaticsCard
DetailedStaticsCard.propTypes = {
  bgColor: PropTypes.oneOf([
    "transparent",
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
  }),
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    component: PropTypes.node.isRequired,
  }).isRequired,
  direction: PropTypes.oneOf(["right", "left"]),
};

export default DetailedStaticsCard;
