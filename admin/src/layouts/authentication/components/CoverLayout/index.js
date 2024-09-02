import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "components/Box";
import Typography from "components/Typography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication layout components
import Footer from "layouts/authentication/components/Footer";

function CoverLayout({ title, description, image, imgPosition, button, children }) {
  return (
    <PageLayout>
      <Box mt={1}>
        <DefaultNavbar
          action={{
            type: "external",
            route: "https://creative-tim.com/product/-dashboard-material-ui",
            label: "Free Download",
            ...button,
          }}
          transparent
          light
        />
      </Box>
      <Box
        width="calc(100% - 2rem)"
        minHeight="50vh"
        borderRadius="lg"
        mx={2}
        mt={2}
        mb={8}
        pt={18}
        pb={20}
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: imgPosition,
          backgroundRepeat: "no-repeat",
        }}
      >
        <Grid container spacing={3} justifyContent="center" sx={{ textAlign: "center" }}>
          <Grid item xs={10} lg={4}>
            <Box mb={1}>
              <Typography variant="h1" color="white" fontWeight="bold">
                {title}
              </Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="body2" color="white" fontWeight="regular">
                {description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mt={{ xs: -26, lg: -24 }} px={1} width="calc(100% - 2rem)" mx="auto">
        <Grid container justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </PageLayout>
  );
}

// Setting default values for the props of CoverLayout
CoverLayout.defaultProps = {
  title: "",
  description: "",
  imgPosition: "center",
  button: { color: "white" },
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  imgPosition: PropTypes.string,
  button: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
