import { forwardRef } from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";
import Box from "components/Box";
import Typography from "components/Typography";

// custom styles for the NotificationItem
import { menuItem, menuImage } from "examples/Items/NotificationItem/styles";

const NotificationItem = forwardRef(({ color, image, title, date, ...rest }, ref) => (
  <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
    <Box
      width="2.25rem"
      height="2.25rem"
      mt={0.25}
      mr={2}
      mb={0.25}
      borderRadius="lg"
      sx={(theme) => menuImage(theme, { color })}
    >
      {image}
    </Box>
    <Box>
      <Typography variant="button" textTransform="capitalize" fontWeight="regular">
        <strong>{title[0]}</strong> {title[1]}
      </Typography>
      <Typography
        variant="caption"
        color="secondary"
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 0.5,
        }}
      >
        <Typography variant="button" color="secondary">
          <Icon
            sx={{
              lineHeight: 1.2,
              mr: 0.5,
            }}
          >
            watch_later
          </Icon>
        </Typography>
        {date}
      </Typography>
    </Box>
  </MenuItem>
));

// Setting default values for the props of NotificationItem
NotificationItem.defaultProps = {
  color: "dark",
};

// Typechecking props for the NotificationItem
NotificationItem.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  image: PropTypes.node.isRequired,
  title: PropTypes.arrayOf(PropTypes.string).isRequired,
  date: PropTypes.string.isRequired,
};

export default NotificationItem;
