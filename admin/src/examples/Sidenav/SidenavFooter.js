import Link from "@mui/material/Link";
import Button from "components/Button";
import Box from "components/Box";
import Typography from "components/Typography";

import { useController } from "context";

function SidenavFooter() {
  const [controller] = useController();
  const { miniSidenav, darkSidenav } = controller;

  return (
    <Box opacity={miniSidenav ? 0 : 1} sx={{ transition: "opacity 200ms linear" }}>
      <Box position="relative" textAlign="center">
        <Box
          width="100%"
          pt={12}
          px={2}
          color={darkSidenav ? "white" : "dark"}
          textAlign="center"
          lineHeight={0}
        >
          <Typography color="inherit" variant="h6">
            Need help?
          </Typography>
          <Typography color="inherit" variant="caption">
            Please reach at dev@acmeflare.in
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SidenavFooter;
