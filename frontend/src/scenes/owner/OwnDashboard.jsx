import {
  Box,
  Button,
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

const OwnDashboard = () => {
  const BASE_URL = "http://localhost:5000/stocks";
  const [stocks, setStocks] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    stockPrice: "",
    retailPrice: "",
    quantity: "",
  });
  const [onEdit, setOnEdit] = useState(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const fetchStocks = async () => {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setStocks(data);
    };
    fetchStocks();
  }, []);

  const handleCreate = async () => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    const status = await response.status;
    if (status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Stock added successfully",
      });
    }

    setStocks([...stocks, data]);
    setForm({
      name: "",
      description: "",
      stockPrice: "",
      retailPrice: "",
      quantity: "",
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`${BASE_URL}/${id}`, {
          method: "DELETE",
        });
        setStocks(stocks.filter((stock) => stock.id !== id));
        Swal.fire("Deleted!", "Stock has been deleted.", "success");
      }
    });
  };

  const handleUpdate = async (id) => {
    const obj = stocks.find((stock) => stock.id === id);
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    const data = await response.status;
    if (data === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Stock updated successfully",
      });
    }
  };

  const handleInputChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Owner
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                localStorage.setItem("username", "");
                navigate("/login");
              }}
            >
              Log Out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box padding={5}>
        <Typography variant="h4" gutterBottom paddingLeft={4}>
          Add New Stock
        </Typography>
        <Box gridTemplateColumns={{ sm: "1fr 2fr 1fr" }} gap={2}>
          <Box gridColumn={{ sm: "span 2" }}></Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gridColumn={{ sm: "span 1" }}
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ backgroundColor: "#f9f9f9", padding: 3, borderRadius: 2 }}
            >
              <Box flex="1">
                <TextField
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Stock Price"
                  name="stockPrice"
                  value={form.stockPrice}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="number"
                  onInvalid={(e) => {
                    e.target.setCustomValidity("Stock price must be a number");
                  }}
                />
                <TextField
                  label="Retail Price"
                  name="retailPrice"
                  value={form.retailPrice}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="number"
                />
                <TextField
                  label="Quantity"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="number"
                />
              </Box>
            </Box>
          </Box>

          <Box gridColumn={{ sm: "span 2" }}></Box>
        </Box>
        <Box textAlign="right" marginTop={4} marginRight={55}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => {
              handleCreate();
            }}
          >
            Add Stock
          </Button>
        </Box>
      </Box>
      <Box paddingLeft={9} paddingRight={9}>
        <Typography variant="h4" gutterBottom marginTop={4}>
          Existing Stocks
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Stock Price</TableCell>
                <TableCell>Retail Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.map((stock) => (
                <TableRow key={stock.id}>
                  <TableCell>
                    {onEdit === stock.id ? (
                      <TextField
                        name="name"
                        value={stock.name}
                        onChange={(e) => {
                          setStocks(
                            stocks.map((item) =>
                              item.id === stock.id
                                ? { ...item, name: e.target.value }
                                : item
                            )
                          );
                        }}
                        variant="outlined"
                        margin="normal"
                      />
                    ) : (
                      stock.name
                    )}
                  </TableCell>
                  <TableCell>
                    {onEdit === stock.id ? (
                      <TextField
                        name="description"
                        value={stock.description}
                        onChange={(e) => {
                          setStocks(
                            stocks.map((item) =>
                              item.id === stock.id
                                ? { ...item, description: e.target.value }
                                : item
                            )
                          );
                        }}
                        variant="outlined"
                        margin="normal"
                      />
                    ) : (
                      stock.description
                    )}
                  </TableCell>
                  <TableCell>
                    {onEdit === stock.id ? (
                      <TextField
                        name="stockPrice"
                        value={stock.stockPrice}
                        onChange={(e) => {
                          setStocks(
                            stocks.map((item) =>
                              item.id === stock.id
                                ? { ...item, stockPrice: e.target.value }
                                : item
                            )
                          );
                        }}
                        variant="outlined"
                        margin="normal"
                        type="number"
                      />
                    ) : (
                      stock.stockPrice
                    )}
                  </TableCell>
                  <TableCell>
                    {onEdit === stock.id ? (
                      <TextField
                        name="retailPrice"
                        value={stock.retailPrice}
                        onChange={(e) => {
                          setStocks(
                            stocks.map((item) =>
                              item.id === stock.id
                                ? { ...item, retailPrice: e.target.value }
                                : item
                            )
                          );
                        }}
                        variant="outlined"
                        margin="normal"
                        type="number"
                      />
                    ) : (
                      stock.retailPrice
                    )}
                  </TableCell>
                  <TableCell>
                    {onEdit === stock.id ? (
                      <TextField
                        name="quantity"
                        value={stock.quantity}
                        onChange={(e) => {
                          setStocks(
                            stocks.map((item) =>
                              item.id === stock.id
                                ? { ...item, quantity: e.target.value }
                                : item
                            )
                          );
                        }}
                        variant="outlined"
                        margin="normal"
                        type="number"
                      />
                    ) : (
                      stock.quantity
                    )}
                  </TableCell>
                  <TableCell>
                    {onEdit === stock.id ? (
                      <Button
                        onClick={() => {
                          handleUpdate(stock.id);
                          setOnEdit(null);
                        }}
                        variant="contained"
                        color="success"
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setOnEdit(stock.id)}
                        variant="contained"
                        color="success"
                      >
                        Edit
                      </Button>
                    )}
                    {onEdit === stock.id ? (
                      <Button
                        onClick={() => setOnEdit(null)}
                        variant="contained"
                        color="error"
                        sx={{ marginLeft: 2 }}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleDelete(stock.id)}
                        variant="contained"
                        color="error"
                        sx={{ marginLeft: 2 }}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default OwnDashboard;
