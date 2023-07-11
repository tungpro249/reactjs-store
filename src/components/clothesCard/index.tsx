import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

function ClothesCard({ item, handleViewDetail }: { item: any; handleViewDetail: any }) {
  return (
    <Card style={{ padding: "25px", margin: "10px" }}>
      <CardMedia
        component="img"
        alt={item.name}
        height="300"
        image={item.image}
        title={item.name}
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {item.name}
        </Typography>
        <Typography color="textSecondary">{item.price}</Typography>
        <Typography variant="body2" component="p">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Mua
        </Button>
        <Button size="small" color="secondary">
          Thêm vào giỏ hàng
        </Button>
      </CardActions>
    </Card>
  );
}

export default ClothesCard;
