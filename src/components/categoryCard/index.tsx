import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { typeCategory } from "../../types/typeCategory";
import Typography from "@mui/material/Typography";
import { convertToUnsigned, formatString } from "utils";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({
  category,
  height,
  ...props
}: {
  category: typeCategory;
  height: number | string;
  props?: any;
}) => {
  const navigate = useNavigate();
  const handleClickCategory = () => {
    navigate(`/collections/san-pham-moi`);
  };
  return (
    <Card
      style={{ margin: "10px", outline: "none", transition: "transform 0.3s ease-in-out" }}
      onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.transform = "scale(1.05)")}
      onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.transform = "scale(1)")}
      onClick={handleClickCategory}
    >
      <CardMedia
        component="img"
        height={height}
        image={`${process.env.REACT_APP_IMAGE_URL}/${category.image}`}
        alt={category.name}
        style={{ marginRight: "10px" }}
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6">{formatString(category.name)}</Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
