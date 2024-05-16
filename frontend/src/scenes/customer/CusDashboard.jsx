import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductCard = ({ product, onShow, onSelectProduct }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          boxShadow: 1,
          borderRadius: 1,
          bgcolor: "background.paper",
          margin: 2,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4 }}>
          {product.name}
        </Typography>
        <Typography variant="h6">{product.description}</Typography>
        <Typography variant="h6">{product.retailPrice}</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => {
            onShow();
            onSelectProduct(product);
          }}
        >
          Add To Cart
        </Button>
      </Box>
    </>
  );
};

const CusDashboard = () => {
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:5000/stocks";
  const [stocks, setStocks] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [alert, setAlert] = useState("");
  const [showCart, setShowCart] = useState(false);

  const onShow = () => {
    setShow(!show);
  };

  const onSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCheckout = async (cart) => {
    const obj = {
      orderDetails: {
        orderDate: new Date(),
        orderStatus: "Pending",
        totalAmount: cart.reduce((acc, item) => {
          return acc + item.retailPrice * item.orderQuantity;
        }, 0),
        customer: localStorage.getItem("username"),
      },

      orderStock: [
        ...cart.map((item) => {
          return {
            stockId: item.id,
            quantity: item.orderQuantity,
          };
        }),
      ],
    };

    const response = await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    console.log(response);
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Order Placed Successfully!",
      }).then(() => {
        setCart([]);
        fetchStocks();
      });
    }
  };

  const fetchStocks = async () => {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    setStocks(data);
  };

  useLayoutEffect(() => {
    fetchStocks();
  }, []);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Customer
            </Typography>

            <IconButton
              color="inherit"
              onClick={() => {
                if (cart.length === 0) {
                  Swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: "Cart is empty!",
                  });
                  return;
                } else {
                  setShowCart(!showCart);
                }
              }}
            >
              <ShoppingCartOutlinedIcon />
            </IconButton>
            <Button
              color="inherit"
              onClick={() => {
                localStorage.removeItem("username");
                navigate("/login");
              }}
            >
              Log Out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <Typography variant="h3" sx={{ mt: 2, mb: 2, ml: 2 }}>
          Buy Products
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 3,
            margin: 4,
          }}
        >
          {stocks.map((stock) => (
            <ProductCard
              key={stock.id}
              product={stock}
              onShow={onShow}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </Box>
      </Box>
      <Modal
        open={show}
        onClose={() => {
          setShow(false);
          setAlert("");
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            m: 4,
            p: 4,
            borderRadius: 5,
            position: "inherit",
            width: "30%",
          }}
        >
          <Typography variant="h4" sx={{ mb: 4 }}>
            Add to Cart
          </Typography>

          <Typography variant="h6">{selectedProduct?.name}</Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            {selectedProduct?.description}
          </Typography>
          <Typography variant="h6">
            Price : {selectedProduct?.retailPrice}
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Available Quantity : {selectedProduct?.quantity}
          </Typography>

          <TextField
            label="Quantity"
            variant="outlined"
            type="number"
            sx={{ mb: 2 }}
            onChange={(e) => {
              setSelectedProduct({
                ...selectedProduct,
                orderQuantity: e.target.value,
              });
            }}
          />
          <Typography variant="h6" sx={{ color: "red" }}>
            {alert}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
              onClick={() => {
                setAlert("");
                if (
                  !selectedProduct.orderQuantity ||
                  selectedProduct.orderQuantity < 1 ||
                  selectedProduct.orderQuantity > selectedProduct.quantity ||
                  isNaN(selectedProduct.orderQuantity)
                ) {
                  if (
                    selectedProduct.orderQuantity > selectedProduct.quantity
                  ) {
                    setAlert("Quantity is more than available stock");
                  } else {
                    setShow(false);
                  }
                  return;
                }
                setCart([...cart, selectedProduct]);
                setShow(false);
              }}
            >
              Add
            </Button>

            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={() => {
                setAlert("");
                setShow(false);
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={showCart}
        onClose={() => {
          setShowCart(false);
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            m: 4,
            p: 4,
            borderRadius: 5,
            position: "inherit",
            width: "50%",
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ mb: 4 }}>
              Cart
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.orderQuantity}</TableCell>
                      <TableCell>{product.retailPrice}</TableCell>
                      <TableCell>
                        {parseFloat(
                          product.retailPrice * product.orderQuantity
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            setCart(
                              cart.filter((item) => item.id !== product.id)
                            );
                          }}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
              onClick={() => {
                setShowCart(false);
                handleCheckout(cart);
              }}
            >
              Checkout
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={() => {
                setShowCart(false);
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CusDashboard;
