import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";
import UpdateProduct from "../update";
import DeleteProduct from "../delete";
import { WarningTwoIcon } from "@chakra-ui/icons";

const ProductTable = ({ products, refreshProducts }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th fontSize={16}>اسم المنتج</Th>
          <Th fontSize={16}>سعر الشراء</Th>
          <Th fontSize={16}>سعر البيع</Th>
          <Th fontSize={16}>المخزون المتاح</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map((product) => (
          <Tr key={product.id}>
            <Td>{product.name}</Td>
            <Td>{product.priceAchat}</Td>
            <Td>{product.priceVente}</Td>
            <Td>
              <HStack spacing={4}>
                {product.stock < 10 && (
                  <WarningTwoIcon
                    color={product.stock === 0 ? "red" : "orange"}
                  />
                )}
                <Text>{product.stock}</Text>{" "}
              </HStack>
            </Td>
            <Td>
              <HStack spacing={2}>
                <UpdateProduct
                  product={product}
                  refreshProducts={refreshProducts}
                />
                <DeleteProduct
                  productId={product.id}
                  refreshProducts={refreshProducts}
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ProductTable;
