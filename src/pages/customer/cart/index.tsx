import {
  Badge,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { deleteCart, getAllCart, payment, updateCart } from "../../../constants/api";
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

  const handleBuyCart = async () => {
    const buyCartResponse = await axios.post(payment, {
      user_id: userId,
      items: cartItems,
    });
    if (buyCartResponse) {
      alert("Thanh toán đơn hàng thành công.");
    }
    window.location.reload();
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
          <Box sx={{ float: "right" }}>
            <Button
              style={{
                background: "blueviolet",
                padding: "10px",
                marginTop: "20px",
                color: "white",
              }}
              onClick={() => {
                setOpen(true);
              }}
            >
              Thanh toán
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            background: "white",
            textAlign: "center",
            margin: "70px auto",
            width: "80%",
            height: "80%",
            borderRadius: "10px",
            padding: "12px",
          }}
        >
          <Table style={{ borderCollapse: "collapse" }}>
            <TableBody>
              {cartItems.map((item: any, key: number) => (
                <TableRow key={key} className={"table-border"}>
                  <TableCell className={"table-border"}>{item.name}</TableCell>
                  <TableCell className={"table-border"}>{item.price} VNĐ</TableCell>
                  <TableCell className={"table-border"}>
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
                  </TableCell>
                  <TableCell className={"table-border"}>{item.price * item.quantity} VNĐ</TableCell>
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
          <br />
          <br />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Kiểu thanh toán</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value="money" control={<Radio />} label="Thanh toán tiền mặt" />
              <FormControlLabel
                value="banking"
                control={<Radio />}
                label="Thanh toán chuyển khoản"
              />
            </RadioGroup>
          </FormControl>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                handleBuyCart();
              }}
            >
              Đặt hàng
            </Button>
            <Box sx={{ padding: "0 30px" }} />
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color={"error"}
              onClick={() => {
                handleClose();
              }}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;