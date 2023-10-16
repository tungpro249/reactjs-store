import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

function ClothesCard({ item }: { item: any }) {
  const imageUrlForDisplay = "http://localhost:1000/" + item?.image.replace(/\\/g, "/");
  return (
    <Box height={450}>
      <CardMedia
        component="img"
        alt={""}
        height="300"
        image={imageUrlForDisplay}
        title={item?.name}
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {item?.name}
        </Typography>
        <Typography color="textSecondary">{item?.price}</Typography>
        <Typography variant="body2" component="p">
          {item?.description}
        </Typography>
      </CardContent>
    </Box>
  );
}

export default ClothesCard;
