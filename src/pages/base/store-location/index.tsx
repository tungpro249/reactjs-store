import React, { useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Box, Grid, Typography } from "@mui/material";

const StoreLocation = () => {
  const [markerLocation] = useState({
    lat: 21.028511,
    lng: 105.804817,
  });

  const handleMapClick = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${markerLocation.lat},${markerLocation.lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <Box sx={{ py: 4, px: 2, maxWidth: "1200px", mx: "auto" }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Store Location
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
        Visit us and discover everything
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4, height: "400px" }}>
        <Grid item xs={12} md={6}>
          {/* Có thể thêm thông tin stores hoặc bộ lọc tại đây */}
        </Grid>
        <Grid item xs={12} md={6}>
          <APIProvider apiKey={process.env.NEXT_PUBLIC_API_MAP_KEY ?? ""}>
            <Map
              style={{
                borderRadius: "20px",
                width: "100%",
                height: "100%",
              }}
              defaultZoom={13}
              defaultCenter={markerLocation}
              gestureHandling={"greedy"}
              disableDefaultUI
              onClick={handleMapClick}
            >
              <Marker position={markerLocation} />
            </Map>
          </APIProvider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StoreLocation;
