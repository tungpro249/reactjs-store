import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const VietnamLocalSelect = ({
  handleChooseCity,
  handleChooseDistrict,
  handleChooseWard,
}: {
  handleChooseCity: Function;
  handleChooseDistrict: Function;
  handleChooseWard: Function;
}) => {
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

  const handleCityChange = (event: any, value: any) => {
    setSelectedCity(value?.Id || "");
    setSelectedDistrict("");
    setSelectedWard("");

    handleChooseCity(value?.Name || "");
    handleChooseDistrict("");
    handleChooseWard("");
    // @ts-ignore
    const selectedCityData = cities.find((city) => city?.Id === value?.Id);
    // @ts-ignore
    setDistricts(selectedCityData ? selectedCityData.Districts : []);
    setWards([]);
  };

  const handleDistrictChange = (event: any, value: any) => {
    setSelectedDistrict(value?.Id || "");
    setSelectedWard("");

    handleChooseDistrict(value?.Name || "");
    handleChooseWard("");
    // @ts-ignore
    const selectedCityData = cities.find((city) => city?.Id === selectedCity);
    const selectedDistrictData =
      // @ts-ignore
      selectedCityData && selectedCityData.Districts.find((district) => district?.Id === value?.Id);
    // @ts-ignore
    setWards(selectedDistrictData ? selectedDistrictData.Wards : []);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Autocomplete
        options={cities}
        // @ts-ignore
        getOptionLabel={(city) => city?.Name}
        // @ts-ignore
        value={cities.find((city) => city?.Id === selectedCity) || null}
        onChange={handleCityChange}
        renderInput={(params) => (
          <TextField {...params} label="Chọn tỉnh thành" variant="outlined" />
        )}
        fullWidth
      />

      <Autocomplete
        options={districts}
        // @ts-ignore
        getOptionLabel={(district) => district?.Name}
        // @ts-ignore
        value={districts.find((district) => district?.Id === selectedDistrict) || null}
        onChange={handleDistrictChange}
        renderInput={(params) => (
          <TextField {...params} label="Chọn quận huyện" variant="outlined" />
        )}
        fullWidth
        sx={{ margin: "0 8px" }}
      />
      <Autocomplete
        options={wards}
        // @ts-ignore
        getOptionLabel={(ward) => ward?.Name}
        // @ts-ignore
        value={wards.find((ward) => ward?.Id === selectedWard) || null}
        onChange={(event: any, value: any) => {
          // @ts-ignore
          setSelectedWard(value?.Id || "");
          handleChooseWard(value?.Name || "");
        }}
        renderInput={(params) => (
          <TextField {...params} label="Chọn phường xã" variant="outlined" />
        )}
        fullWidth
      />
    </div>
  );
};

export default VietnamLocalSelect;