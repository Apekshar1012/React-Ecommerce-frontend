import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  CircularProgress,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";

function ProductCard({ product }) {
  const [variant, setVariant] = useState("Default");
  const inStock = product.inStock ?? true; 

  const handleVariantChange = (event) => {
    setVariant(event.target.value);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: "contain", backgroundColor: "#f5f5f5" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.title}
        </Typography>
        <Typography variant="body1" color="text.primary">
          ${product.price.toFixed(2)}
        </Typography>

        <FormControl fullWidth size="small" sx={{ mt: 2 }}>
          <InputLabel id={`variant-select-label-${product.id}`}>Variant</InputLabel>
          <Select
            labelId={`variant-select-label-${product.id}`}
            value={variant}
            label="Variant"
            onChange={handleVariantChange}
          >
            <MenuItem value="Default">Default</MenuItem>
            <MenuItem value="Small">Small</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Large">Large</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        <Button
          variant="contained"
          size="medium"
          fullWidth
          disabled={!inStock}
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardActions>
    </Card>
  );
}

function ProductList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let componentMounted = true;

    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (componentMounted) {
        const products = await response.json();
        const productsWithStock = products.map((p) => ({
          ...p,
          inStock: Math.random() > 0.2, 
        }));
        setData(productsWithStock);
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      componentMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Grid container justifyContent="center" sx={{ marginTop: 4 }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ padding: 2 }}>
      {data.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
