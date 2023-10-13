import { Badge, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { getAllCart } from "../../../constants/api";
import axios from "axios";
import { useAppController } from "../../../contexts/app";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  // @ts-ignore
  const [userController] = useAppController();
  const userId = userController?.user?.currentUser?.data.id;

  useEffect(() => {
    const fetchCartItems = async () => {
      if (userId) {
        try {
          const response = await axios.get(getAllCart(userId));
          if (response.data) {
            setCartItems(response.data);
          }
        } catch (error) {
          console.log("Error fetching cart items:", error);
        }
      }
    };
    fetchCartItems();
  }, [userId]);

  return (
    <div className="row">
      <div className="col-md-12">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Giá tiền</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Tổng tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item: any, key: number) => (
              <TableRow key={key}>
                <TableCell>
                  <Badge onClick={() => {}} badgeContent="X" />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <img src={item.image} alt={item.name} width={150} height={200} />
                </TableCell>
                <TableCell>{item.price} $</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => {}}>
                    -
                  </Button>
                  <Button variant="contained" color="info">
                    {5}
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => {}}>
                    +
                  </Button>
                </TableCell>
                <TableCell>10000 $</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={5}>Total Carts</TableCell>
              <TableCell>{10000} $</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Cart;