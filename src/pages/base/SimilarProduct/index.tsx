import React from "react";
import { Grid } from "@mui/material";
import { typeProduct } from "../../../types/typeProduct";
import ClothesCard from "../../../components/clothesCard";
import FormCardComponent from "../../../components/form/productActionCard";

interface SimilarProductsProps {
  products: typeProduct[];
  productDetail: typeProduct | undefined;
  handleProductClick: (product: typeProduct) => void;
  handleBuy: (product: typeProduct) => void;
  handleAddToCart: (id: number) => void;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({
  products,
  productDetail,
  handleProductClick,
  handleBuy,
  handleAddToCart,
}) => {
  return (
    <Grid container padding={"50px"}>
      {products
        .filter((item) => item.category?.id === productDetail?.category?.id)
        .map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <FormCardComponent
              handleClickBuyItem={() => handleBuy(item)}
              handleAddToCard={() => {
                if (item.quantity > 0) {
                  handleAddToCart(item.id);
                } else {
                  alert("Sản phẩm đang hết hàng.");
                }
              }}
            >
              <div onClick={() => handleProductClick(item)}>
                <ClothesCard item={item} />
              </div>
            </FormCardComponent>
          </Grid>
        ))}
    </Grid>
  );
};

export default SimilarProducts;
