import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import Box from "components/Box";
import Typography from "components/Typography";
import typography from "assets/theme/base/typography";

function Footer({ company, links }) {
  const { href, name } = company;
  const { size } = typography;

  const renderLinks = () =>
    links.map((link) => (
      <Box key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <Typography variant="button" fontWeight="regular" color="text">
            {link.name}
          </Typography>
        </Link>
      </Box>
    ));

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
      alignSelf="flex-end"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, created by
        <Link href={href} target="_blank">
          <Typography variant="button" fontWeight="medium">
            &nbsp;{name}&nbsp;
          </Typography>
        </Link>
      </Box>
      <Box
        component="ul"
        sx={({ breakpoints }) => ({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          listStyle: "none",
          mt: 3,
          mb: 0,
          p: 0,

          [breakpoints.up("lg")]: {
            mt: 0,
          },
        })}
      >
        {renderLinks()}
      </Box>
    </Box>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { href: "https://www.acmeflare.in/", name: "Acmeflare Technologies Pvt Ltd" },
  links: [
    { href: "https://www.acmeflare.in/", name: "Acmeflare" },
    { href: "https://www.acmeflare.in/#about", name: "About Us" },
    { href: "https://www.acmeflare.in/#service", name: "Service" },
    { href: "https://www.acmeflare.in/#contact", name: "Contact" },
  ],
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
