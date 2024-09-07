import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  VStack,
  HStack,
  Stack,
  Input,
  Box,
} from "@chakra-ui/react";
import AddProduct from "./components/product/add";
import ProductTable from "./components/product/table";
const App = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const refreshProducts = () => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <Box
      minH={"100vh"}
      w={"full"}
      h={"full"}
      bg={"#212121"}
    >
      <Container dir="rtl" maxW={"8xl"}>
        <VStack spacing={10} pt={50} w={"full"} h={"full"}>
          <HStack spacing={4} w={"full"} justify={"flex-end"}>
            <AddProduct refreshProducts={refreshProducts} />
          </HStack>
          <Stack w={"full"} h={"full"}>
            <Input
              placeholder="البحث عن المنتجات..."
              value={searchQuery}
              onChange={handleSearch}
              mb={4}
            />
            <ProductTable
              products={filteredProducts}
              refreshProducts={refreshProducts}
            />
          </Stack>
        </VStack>
      </Container>
    </Box>
  );
};

export default App;
