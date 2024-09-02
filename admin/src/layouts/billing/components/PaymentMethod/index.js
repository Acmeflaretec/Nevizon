import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

//  Dashboard 2 MUI components
import Box from "components/Box";
import Typography from "components/Typography";
import Button from "components/Button";

//  Dashboard 2 MUI base styles
import borders from "assets/theme/base/borders";

// Images
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaLogo from "assets/images/logos/visa.png";

function PaymentMethod() {
  const { borderWidth, borderColor } = borders;

  return (
    <Card id="delete-account">
      <Box pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="medium">
          Payment Method
        </Typography>
        <Button variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;Add New Card
        </Button>
      </Box>
      <Box p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              border={`${borderWidth[1]} solid ${borderColor}`}
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <Box component="img" src={masterCardLogo} alt="master card" width="10%" mr={2} />
              <Typography variant="h6" fontWeight="medium">
                ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;7852
              </Typography>
              <Box ml="auto" lineHeight={0}>
                <Tooltip title="Edit Card" placement="top">
                  <Icon sx={{ cursor: "pointer" }} fontSize="small">
                    edit
                  </Icon>
                </Tooltip>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              border={`${borderWidth[1]} solid ${borderColor}`}
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <Box component="img" src={visaLogo} alt="master card" width="10%" mr={2} />
              <Typography variant="h6" fontWeight="medium">
                ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;5248
              </Typography>
              <Box ml="auto" lineHeight={0}>
                <Tooltip title="Edit Card" placement="top">
                  <Icon sx={{ cursor: "pointer" }} fontSize="small">
                    edit
                  </Icon>
                </Tooltip>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default PaymentMethod;
