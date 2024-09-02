import Divider from "@mui/material/Divider";
import Box from "components/Box";
import Typography from "components/Typography";

function Separator() {
  return (
    <Box position="relative" py={0.25}>
      <Divider />
      <Box
        bgColor="white"
        position="absolute"
        top="50%"
        left="50%"
        px={1.5}
        lineHeight={1}
        sx={{ transform: "translate(-50%, -60%)" }}
      >
        <Typography variant="button" fontWeight="medium" color="secondary">
          or
        </Typography>
      </Box>
    </Box>
  );
}

export default Separator;
