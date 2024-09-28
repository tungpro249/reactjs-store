import { Button, Card, CardActions } from "@mui/material";
import React from "react";

interface FormCardComponentProps {
  handleClickBuyItem: () => void; // Kiểu trả về void
  handleAddToCard: () => void; // Kiểu trả về void
  children: React.ReactNode; // Kiểu của children
}

const FormCardComponent: React.FC<FormCardComponentProps> = ({
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

export default FormCardComponent;
