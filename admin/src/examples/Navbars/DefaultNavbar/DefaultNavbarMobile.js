import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Collapse from "@mui/material/Collapse";
import MuiLink from "@mui/material/Link";
import Icon from "@mui/material/Icon";

import Box from "components/Box";
import Typography from "components/Typography";

import DefaultNavbarDropdown from "examples/Navbars/DefaultNavbar/DefaultNavbarDropdown";
import { useController } from "context";

function DefaultNavbarMobile({ routes, open }) {
  const [collapse, setCollapse] = useState("");
  const [controller] = useController();
  const { darkMode } = controller;

  const handleSetCollapse = (name) => (collapse === name ? setCollapse(false) : setCollapse(name));

  const renderNavbarItems = routes.map(
    ({ name, icon, collapse: routeCollapses, href, route, collapse: navCollapse }) => (
      <DefaultNavbarDropdown
        key={name}
        name={name}
        icon={icon}
        collapseStatus={name === collapse}
        onClick={() => handleSetCollapse(name)}
        href={href}
        route={route}
        collapse={Boolean(navCollapse)}
      >
        <Box sx={{ height: "15rem", maxHeight: "15rem", overflowY: "scroll" }}>
          {routeCollapses &&
            routeCollapses.map((item) => (
              <Box key={item.name} px={item.icon ? 1 : 2}>
                {item.collapse ? (
                  <>
                    <Box width="100%" display="flex" alignItems="center" p={1}>
                      {item.icon && (
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          width="1.5rem"
                          height="1.5rem"
                          borderRadius="md"
                          color="text"
                          mr={1}
                          fontSize="1rem"
                          lineHeight={1}
                        >
                          {typeof item.icon === "string" ? <Icon>{item.icon}</Icon> : item.icon}
                        </Box>
                      )}
                      <Typography
                        display="block"
                        variant="button"
                        fontWeight="bold"
                        textTransform="capitalize"
                      >
                        {item.name}
                      </Typography>
                    </Box>
                    {item.collapse.map((el, index) => (
                      <Typography
                        key={el.name}
                        component={el.route ? Link : MuiLink}
                        to={el.route ? el.route : ""}
                        href={el.href ? el.href : ""}
                        target={el.href ? "_blank" : ""}
                        rel={el.href ? "noreferrer" : "noreferrer"}
                        minWidth="11.25rem"
                        display="block"
                        variant="button"
                        color="text"
                        textTransform="capitalize"
                        fontWeight="regular"
                        py={0.625}
                        px={item.icon ? 5 : 2}
                        mb={index === item.collapse.length - 1 ? 2 : 0}
                        sx={({
                          palette: { white, grey, dark },
                          borders: { borderRadius },
                          functions: { rgba },
                        }) => ({
                          borderRadius: borderRadius.md,
                          cursor: "pointer",
                          transition: "all 300ms linear",

                          "&:hover": {
                            backgroundColor: rgba(grey[200], darkMode ? 0.1 : 1),
                            color: darkMode ? white.main : dark.main,
                          },
                        })}
                      >
                        {el.name}
                      </Typography>
                    ))}
                  </>
                ) : (
                  <Box
                    key={item.key}
                    display="flex"
                    component={item.route ? Link : MuiLink}
                    to={item.route ? item.route : ""}
                    href={item.href ? item.href : ""}
                    target={item.href ? "_blank" : ""}
                    rel={item.href ? "noreferrer" : "noreferrer"}
                    sx={({
                      palette: { white, grey, dark },
                      borders: { borderRadius },
                      functions: { rgba },
                    }) => ({
                      borderRadius: borderRadius.md,
                      cursor: "pointer",
                      transition: "all 300ms linear",
                      py: 1,
                      px: 1.625,

                      "&:hover": {
                        backgroundColor: rgba(grey[200], darkMode ? 0.1 : 1),
                        color: darkMode ? white.main : dark.main,
                      },
                    })}
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width="1.5rem"
                      height="1.5rem"
                      borderRadius="md"
                      color="text"
                      mr={1}
                      fontSize="1rem"
                      lineHeight={1}
                    >
                      {typeof item.icon === "string" ? <Icon>{item.icon}</Icon> : item.icon}
                    </Box>
                    <Box>
                      <Typography
                        display="block"
                        variant="button"
                        fontWeight={!item.description ? "regular" : "bold"}
                        mt={!item.description ? 0.25 : 0}
                        textTransform="capitalize"
                      >
                        {item.name || "&nbsp"}
                      </Typography>
                      {item.description && (
                        <Typography
                          display="block"
                          variant="button"
                          color="text"
                          fontWeight="regular"
                          sx={{ transition: "all 300ms linear" }}
                        >
                          {item.description}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
        </Box>
      </DefaultNavbarDropdown>
    )
  );

  return (
    <Collapse in={Boolean(open)} timeout="auto" unmountOnExit>
      <Box width="calc(100% + 1.625rem)" my={2} ml={-2}>
        {renderNavbarItems}
      </Box>
    </Collapse>
  );
}

// Typechecking props for the DefaultNavbarMobile
DefaultNavbarMobile.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

export default DefaultNavbarMobile;
