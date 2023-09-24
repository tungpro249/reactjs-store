import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

function ClothesCard({ item }: { item: any }) {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = storedUser && storedUser.currentUser?.data?.isAdmin;
  const checkRole = isAdmin || "";

  const handleBuy = () => {
    alert("mua hang");
  };

  const handleAddToCart = () => {
    alert("them gio hang");
  };

  return (
    <Card style={{ padding: "25px", margin: "10px" }}>
      <CardMedia component="img" alt={""} height="300" image={item?.image} title={item?.name} />
      <CardContent>
        <Typography variant="h5" component="h2">
          {item?.name}
        </Typography>
        <Typography color="textSecondary">{item?.price}</Typography>
        <Typography variant="body2" component="p">
          {item?.description}
        </Typography>
      </CardContent>
      {!checkRole ? (
        <CardActions>
          <Button size="small" color="primary" onClick={handleBuy}>
            Mua
          </Button>
          <Button size="small" color="secondary">
            Thêm vào giỏ hàng
          </Button>
        </CardActions>
      ) : (
        <CardActions>
          <Button size="small" color="primary">
            Sửa
          </Button>
          <Button size="small" color="secondary">
            Xóa
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

export default ClothesCard;
