import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

function ClothesCard() {
  return (
    <Card>
      <CardMedia
        component="img"
        alt="Clothes Image"
        height="300"
        image="https://picsum.photos/200/300"
        title="Clothes Image"
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          Clothes Title
        </Typography>
        <Typography color="textSecondary">$99.99</Typography>
        <Typography variant="body2" component="p">
          Clothes Description
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Buy
        </Button>
        <Button size="small" color="secondary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ClothesCard;
