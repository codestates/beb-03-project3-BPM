import { Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
      <Typography sx={{ fontSize: 30 }}>Loading...</Typography>
      <CircularProgress sx={{ mt: 10, fontSize: 40 }} />
    </Stack>
  );
}
