import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { GET_ALL_CATEGORIES } from "../../constants/api";
import { typeCategory } from "../../types/typeCategory";
import { useLocation } from "react-router-dom";

const Collections = () => {
  const [categories, setCategories] = useState<Array<typeCategory>>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const location = useLocation();
  const renderName = () => {
    switch (location.pathname) {
      case "/collections/san-pham-moi": {
        return "Sản phẩm mới";
      }
      case "/collections/sale": {
        return "Sale";
      }
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_ALL_CATEGORIES);
        if (response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Grid container p={5}>
        <Grid item xs={3} md={3}>
          <h3>Danh mục</h3>
          {categories.map((item) => (
            <p>{item.name}</p>
          ))}
        </Grid>
        <Grid item xs={9} md={9}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h3>{renderName()}</h3>
            <Box sx={{ display: "flex" }}>
              <p>Kích cỡ</p>
              <Box sx={{ padding: "0 10px" }} />
              <p>Giá cả</p>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Collections;
