import React from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const DeleteProduct = ({ productId, refreshProducts }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/products/${productId}`)
      .then(() => {
        refreshProducts();
        toast({
          title: "تم حذف المنتج.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast({
          title: "فشل في حذف المنتج.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Button
        h={"35"}
        rightIcon={<DeleteIcon />}
        colorScheme="red"
        onClick={onOpen}
        size="sm"
        ml={2}
      >
        حذف
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#202020"}>
          <ModalHeader>تأكيد الحذف</ModalHeader>
          <ModalCloseButton />
          <ModalBody dir="rtl">
            <Text>هل أنت متأكد أنك تريد حذف هذا المنتج؟</Text>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={4}>
              <Button colorScheme="red" onClick={handleDelete}>
                نعم، حذف
              </Button>
              <Button variant="ghost" onClick={onClose}>
                إلغاء
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteProduct;
