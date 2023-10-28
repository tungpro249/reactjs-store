import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const VietnamLocalSelect = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCityChange = (event, value) => {
    setSelectedCity(value?.Id || "");
    setSelectedDistrict("");
    setSelectedWard("");

    const selectedCityData = cities.find((city) => city.Id === value?.Id);
    setDistricts(selectedCityData ? selectedCityData.Districts : []);
    setWards([]);
  };

  const handleDistrictChange = (event, value) => {
    setSelectedDistrict(value?.Id || "");
    setSelectedWard("");

    const selectedCityData = cities.find((city) => city.Id === selectedCity);
    const selectedDistrictData =
      selectedCityData && selectedCityData.Districts.find((district) => district.Id === value?.Id);
    setWards(selectedDistrictData ? selectedDistrictData.Wards : []);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Autocomplete
        options={cities}
        getOptionLabel={(city) => city.Name}
        value={cities.find((city) => city.Id === selectedCity) || null}
        onChange={handleCityChange}
        renderInput={(params) => (
          <TextField {...params} label="Chọn tỉnh thành" variant="outlined" />
        )}
        fullWidth
      />

      <Autocomplete
        options={districts}
        getOptionLabel={(district) => district.Name}
        value={districts.find((district) => district.Id === selectedDistrict) || null}
        onChange={handleDistrictChange}
        renderInput={(params) => (
          <TextField {...params} label="Chọn quận huyện" variant="outlined" />
        )}
        fullWidth
        sx={{ margin: "0 8px" }}
      />

      <Autocomplete
        options={wards}
        getOptionLabel={(ward) => ward.Name}
        value={wards.find((ward) => ward.Id === selectedWard) || null}
        onChange={(event, value) => setSelectedWard(value?.Id || "")}
        renderInput={(params) => (
          <TextField {...params} label="Chọn phường xã" variant="outlined" />
        )}
        fullWidth
      />
    </div>
  );
};

export default VietnamLocalSelect;