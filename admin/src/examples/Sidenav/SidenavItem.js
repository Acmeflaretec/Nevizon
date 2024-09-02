import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import Box from "components/Box";
import { item, itemIcon, itemText, itemIconBox } from "examples/Sidenav/styles/sidenavItem";
import { useController } from "context";

function SidenavItem({ icon, name, active, open, ...rest }) {
  const [controller] = useController();
  const { miniSidenav, darkSidenav, sidenavColor } = controller;

  return (
    <>
      <ListItem component="li">
        <Box
          {...rest}
          sx={(theme) => item(theme, { active, darkSidenav, sidenavColor, miniSidenav })}
        >
          <ListItemIcon sx={(theme) => itemIconBox(theme, { active, darkSidenav, sidenavColor })}>
            {typeof icon === "string" ? (
              <Icon sx={(theme) => itemIcon(theme, { active })}>{icon}</Icon>
            ) : (
              icon
            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) => itemText(theme, { miniSidenav, darkSidenav, active })}
          />
        </Box>
      </ListItem>
    </>
  );
}

// Setting default values for the props of SidenavItem
SidenavItem.defaultProps = {
  color: "info",
  active: false,
  open: false,
};

// Typechecking props for the SidenavItem
SidenavItem.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  open: PropTypes.bool,
};

export default SidenavItem;
