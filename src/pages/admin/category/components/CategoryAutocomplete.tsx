import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { typeCategory } from "../../../../types/typeCategory";
import axios from "axios";
import { GET_ALL_CATEGORIES } from "../../../../constants/api";

const CategoryAutocomplete = ({
  handleChoose,
  defaultData,
}: {
  handleChoose: any;
  defaultData?: any;
}) => {
  const [categories, setCategories] = useState<Array<typeCategory>>([]);

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

  const handleAutocompleteChange = (event: React.ChangeEvent<{}>, value: typeCategory | null) => {
    if (value) {
      const selectedCategory = {
        id: value.id,
        name: value.name,
      };
      handleChoose(selectedCategory);
    }
  };

  return (
    <Autocomplete
      defaultValue={defaultData}
      disablePortal
      id="combo-box-demo"
      options={categories}
      sx={{ width: 250 }}
      getOptionLabel={(category) => category.name}
      onChange={handleAutocompleteChange}
      renderInput={(params) => <TextField {...params} label="Danh mục" />}
    />
  );
};

export default CategoryAutocomplete;
