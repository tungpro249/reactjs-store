import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { formatNumber, formatString } from "utils";

function ClothesCard({ item }: { item: any }) {
  const imageUrlForDisplay =
    `${process.env.REACT_APP_IMAGE_URL}/` + item?.image.replace(/\\/g, "/");
  return (
    <Box
      height={500}
      style={{
        width: "100%",
        transition: "transform 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.transform = "scale(1.05)")}
      onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.transform = "scale(1)")}
    >
      <CardMedia
        component="img"
        alt={item?.name}
        height={"80%"}
        image={imageUrlForDisplay}
        title={item?.name}
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {formatString(item?.name)}
        </Typography>
        <Typography color="textSecondary">{formatNumber(item?.price)} VNĐ</Typography>
        <Typography variant="body2" component="p">
          {item?.description}
        </Typography>
      </CardContent>
    </Box>
  );
}

export default ClothesCard;
