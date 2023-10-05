import { Badge, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Button from "@mui/material/Button";

const Cart = () => {
  const ListCart: any = [];

  return (
    <div className="row">
      <div className="col-md-12">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ListCart.map((item: any, key: number) => (
              <TableRow key={key}>
                <TableCell>
                  <Badge onClick={() => {}} badgeContent="X" />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <img src={item.image} alt={item.name} />
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