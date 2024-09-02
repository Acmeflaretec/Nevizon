import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Box from "components/Box";
import Typography from "components/Typography";
import Input from "components/Input";
import Button from "components/Button";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/-dashboard-pro/assets/img/signup-cover.jpg";

function Cover() {
  return (
    <CoverLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={bgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <Card>
        <Box p={3} mb={1} textAlign="center">
          <Typography variant="h5" fontWeight="medium">
            Register with
          </Typography>
        </Box>
        <Box mb={2}>
          <Socials />
        </Box>
        <Box px={12}>
          <Separator />
        </Box>
        <Box pt={2} pb={3} px={3}>
          <Box component="form" role="form">
            <Box mb={2}>
              <Input placeholder="Name" />
            </Box>
            <Box mb={2}>
              <Input type="email" placeholder="Email" />
            </Box>
            <Box mb={2}>
              <Input type="password" placeholder="Password" />
            </Box>
            <Box display="flex" alignItems="center">
              <Checkbox defaultChecked />
              <Typography
                variant="button"
                fontWeight="regular"
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </Typography>
              <Typography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </Typography>
            </Box>
            <Box mt={4} mb={1}>
              <Button variant="gradient" color="dark" fullWidth>
                sign up
              </Button>
            </Box>
            <Box mt={2}>
              <Typography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <Typography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
