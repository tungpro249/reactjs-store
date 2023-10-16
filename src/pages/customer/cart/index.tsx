import { Badge, Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { deleteCart, getAllCart, updateCart } from "../../../constants/api";
import axios from "axios";
import { useAppController } from "../../../contexts/app";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { typeProduct } from "../../../types/typeProduct";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  // @ts-ignore
  const [userController] = useAppController();
  const userId = userController?.user?.currentUser?.data.id;

  useEffect(() => {
    const fetchCartItems = async () => {
      if (userId) {
        try {
          const response = await axios.get(getAllCart(userId));
          if (response.data) {
            setCartItems(response.data?.cartItems);
            setTotal(response.data?.totalAmount);
          }
        } catch (error) {
          console.log("Error fetching cart items:", error);
        }
      }
    };
    fetchCartItems();
  }, [userId, quantity]);

  const handleRemoveItem = async (itemId: number) => {
    try {
      const deleteCartItemResponse = await axios.delete(deleteCart(itemId));
      if (deleteCartItemResponse.data) {
        window.location.reload();
      }
    } catch (error) {
      console.log("Error removing item:", error);
    }
  };

  const handleIncreaseQuantity = async (item: typeProduct) => {
    try {
      const updateQuantityResponse = await axios.put(updateCart(item.id), {
        quantity: item.quantity + 1,
      });
      if (updateQuantityResponse.data) {
        setQuantity(updateQuantityResponse.data);
      }
    } catch (error) {
      console.log("Error increasing quantity:", error);
    }
  };

  const handleDecreaseQuantity = async (item: typeProduct) => {
    if (quantity && item.quantity > 1) {
      try {
        const updateQuantityResponse = await axios.put(updateCart(item.id), {
          quantity: item.quantity - 1,
        });
        if (updateQuantityResponse.data) {
          setQuantity(updateQuantityResponse.data);
        }
      } catch (error) {
        console.log("Error decreasing quantity:", error);
      }
    }
  };

  const handleQuantityChange = async (itemId: number, quantity: number) => {
    try {
      const updateQuantityResponse = await axios.put(updateCart(itemId), { quantity });
    } catch (error) {
      console.log("Error updating quantity:", error);
    }
  };

  return (
    <Grid container p={5}>
      <Grid item xs={12}>
        <h2 style={{ textAlignLast: "center", padding: "10px" }}>Giỏ hàng</h2>
        <Table style={{ borderCollapse: "collapse" }}>
          <TableHead>
            <TableRow>
              <TableCell className={"table-border title-table"}>Tên sản phẩm</TableCell>
              <TableCell className={"table-border title-table"}>Hình ảnh</TableCell>
              <TableCell className={"table-border title-table"}>Giá tiền</TableCell>
              <TableCell className={"table-border title-table"}>Số lượng</TableCell>
              <TableCell className={"table-border title-table"}>Tổng tiền</TableCell>
              <TableCell className={"table-border title-table"}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item: any, key: number) => (
              <TableRow key={key} className={"table-border"}>
                <TableCell className={"table-border"}>{item.name}</TableCell>
                <TableCell className={"table-border"}>
                  <img
                    src={"http://localhost:1000/" + item?.image.replace(/\\/g, "/")}
                    alt={item.name}
                    width={150}
                    height={200}
                  />
                </TableCell>
                <TableCell className={"table-border"}>{item.price} VNĐ</TableCell>
                <TableCell className={"table-border"}>
                  <Button variant="outlined" onClick={() => handleDecreaseQuantity(item)}>
                    -
                  </Button>
                  <input
                    type="number"
                    style={{
                      width: "50px",
                      height: "45px",
                      borderRadius: "8px",
                      margin: "0 5px",
                      padding: "3px",
                      fontSize: "larger",
                      border: "1px solid #9d9797",
                    }}
                    value={item.quantity}
                    // onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  />
                  <Button variant="outlined" onClick={() => handleIncreaseQuantity(item)}>
                    +
                  </Button>
                </TableCell>
                <TableCell className={"table-border"}>{item.price * item.quantity} VNĐ</TableCell>
                <TableCell className={"table-border"}>
                  <IconButton
                    onClick={() => handleRemoveItem(item.id)}
                    aria-label="delete"
                    color="error"
                  >
                    <DeleteIcon />
                    <p style={{ fontSize: "13px", paddingLeft: "5px" }}>Xóa</p>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow className={"table-border"}>
              <TableCell colSpan={4} className={"table-border"}>
                Tổng số tiền
              </TableCell>
              <TableCell>{total} VNĐ</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default Cart;