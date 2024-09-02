import { Box, Link } from "@mui/material";
import PageLayout from "layouts/PageLayout";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Button from "components/Button";
import {
  useController,
  setDarkSidenav,
  setMiniSidenav,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
  setDirection
} from "context";
import Typography from "components/Typography";

function Settings() {
  const [controller, dispatch] = useController();
  const { darkSidenav, miniSidenav, fixedNavbar, sidenavColor, darkMode, direction } =
    controller;
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

  const handledarkSidenav = () => setDarkSidenav(dispatch, true);
  const handleWhiteSidenav = () => setDarkSidenav(dispatch, false);
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);
  const handleDirection = () => setDirection(dispatch, direction === "rtl" ? "ltr" : "rtl");
  const handleDarkMode = () => {
    setDarkSidenav(dispatch, !darkMode);
    setDarkMode(dispatch, !darkMode);
  };
  return (
    <PageLayout
      title={'Settings'}
    >
      <Box sx={{ flexGrow: 1 }} height={'100%'} width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} py={2}>
        <Divider />
        <Box pt={1.25} pb={3} px={2}>
          <Box>
            <Typography variant="h6">Sidenav Colors</Typography>
            <Box mb={0.5}>
              {sidenavColors.map((color) => (
                <IconButton
                  key={color}
                  sx={({ borders: { borderWidth }, palette: { white, dark }, transitions }) => ({
                    width: "24px",
                    height: "24px",
                    padding: 0,
                    border: `${borderWidth[1]} solid ${white.main}`,
                    borderColor: sidenavColor === color && dark.main,
                    transition: transitions.create("border-color", {
                      easing: transitions.easing.sharp,
                      duration: transitions.duration.shorter,
                    }),
                    backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                      linearGradient(gradients[color].main, gradients[color].state),

                    "&:not(:last-child)": {
                      mr: 1,
                    },

                    "&:hover, &:focus, &:active": {
                      borderColor: dark.main,
                    },
                  })}
                  onClick={() => setSidenavColor(dispatch, color)}
                />
              ))}
            </Box>
          </Box>
          <Box mt={3} lineHeight={1}>
            <Typography variant="h6">Sidenav Type</Typography>
            <Typography variant="button" color="text" fontWeight="regular">
              Choose between 2 different sidenav types.
            </Typography>
            <Box
              sx={{
                display: "flex",
                mt: 2,
              }}
            >
              <Button
                color="info"
                variant={darkSidenav ? "outlined" : "gradient"}
                onClick={handleWhiteSidenav}
                fullWidth
              >
                White
              </Button>
              <Button
                color="info"
                variant={darkSidenav ? "gradient" : "outlined"}
                onClick={handledarkSidenav}
                fullWidth
                sx={{
                  ml: 1,
                }}
              >
                Dark
              </Button>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" mt={3} lineHeight={1}>
            <Typography variant="h6">Navbar Fixed</Typography>

            <Switch checked={fixedNavbar} onChange={handleFixedNavbar} />
          </Box>

          <Divider />

          <Box display="flex" justifyContent="space-between" lineHeight={1}>
            <Typography variant="h6">Sidenav Mini</Typography>

            <Switch checked={miniSidenav} onChange={handleMiniSidenav} />
          </Box>

          <Divider />

          <Box display="flex" justifyContent="space-between" lineHeight={1}>
            <Typography variant="h6">Light / Dark</Typography>

            <Switch checked={darkMode} onChange={handleDarkMode} />
          </Box>
          <Divider />

          <Box display="flex" justifyContent="space-between" lineHeight={1}>
            <Typography variant="h6">Direction (right-to-left)</Typography>

            <Switch checked={direction === "rtl" ? true : false} onChange={handleDirection} />
          </Box>

          <Box mt={12} textAlign="center">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            color="text"
            fontSize='small'
            px={1.5}
          >
            &copy; {new Date().getFullYear()}, created by
            <Link href={`https://www.acmeflare.in/`} target="_blank">
              <Typography variant="button" fontWeight="medium">
                &nbsp;Acmeflare Technologies Pvt Ltd&nbsp;
              </Typography>
            </Link>
          </Box>
        </Box>
        </Box>
      </Box>
    </PageLayout>
  );
}

export default Settings;
