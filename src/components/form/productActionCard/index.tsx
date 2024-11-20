import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import React from "react";

interface ProductActionCardComponentProps {
  handleClickBuyItem: () => void; // Kiểu trả về void
  handleAddToCard: () => void; // Kiểu trả về void
  children: React.ReactNode; // Kiểu của children
}

const ProductActionCard: React.FC<ProductActionCardComponentProps> = ({
  handleClickBuyItem,
  handleAddToCard,
  children,
}) => {
  return (
    <Card style={{ padding: "25px", margin: "10px" }}>
      {children}
      <CardActions style={{ justifyContent: "space-around" }}>
        <Button
          style={{
            background: "#e11467de",
            padding: "9px",
            fontWeight: "bold",
            color: "aliceblue",
          }}
          onClick={handleClickBuyItem}
        >
          Mua
        </Button>
        <Button
          style={{
            background: "rgb(45 155 236)",
            padding: "9px",
            fontWeight: "bold",
            color: "aliceblue",
          }}
          onClick={handleAddToCard}
        >
          Thêm vào giỏ hàng
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductActionCard;
