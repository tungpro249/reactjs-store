import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const Dashbroad = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${240}px)` },
      }}
    >
      <Toolbar />
      <Grid container>
        <Grid item xs={9}>
          bieu do
        </Grid>
        <Grid item xs={3}>
          overall
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashbroad;
