import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import MDButton from "components/ui/MDButton";
import React from "react";

interface ProductActionCardComponentProps {
  handleClickBuyItem: () => void;
  handleAddToCard: () => void;
  children: React.ReactNode;
}

const ProductActionCard: React.FC<ProductActionCardComponentProps> = ({
  handleClickBuyItem,
  handleAddToCard,
  children,
}) => {
  return (
    <Card style={{ padding: "25px", margin: "10px" }}>
      {children}
      <CardActions>
        <MDButton
          style={{
            background: "#e11467de",
            padding: "9px",
            fontWeight: "bold",
            color: "aliceblue",
          }}
          label="Mua"
          onClick={handleClickBuyItem}
        />
        <MDButton
          style={{
            background: "rgb(45 155 236)",
            padding: "9px",
            fontWeight: "bold",
            color: "aliceblue",
          }}
          label="Thêm vào giỏ hàng"
          onClick={handleAddToCard}
        />
      </CardActions>
    </Card>
  );
};

export default ProductActionCard;
