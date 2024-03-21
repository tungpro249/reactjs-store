import { Button, Card, CardActions } from "@mui/material";
import React from "react";

const FormCardComponent = ({
  handleClickBuyItem,
  handleAddToCard,
  children,
}: {
  handleClickBuyItem: () => Function;
  handleAddToCard: () => Function;
  children: any;
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