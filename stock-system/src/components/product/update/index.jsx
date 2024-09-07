import React from "react";
import axios from "axios";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
  Text,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { validationSchema } from "./validationSchema";
import { EditIcon } from "@chakra-ui/icons";

const UpdateProduct = ({ product, refreshProducts }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = (values) => {
    axios
      .put(`http://localhost:5000/products/${product.id}`, {
        ...product,
        ...values,
      })
      .then(() => {
        refreshProducts();
        onClose();
        toast({
          title: "تم تعديل المنتج.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "فشل في تعديل المنتج.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Button h={'35'} rightIcon={<EditIcon/>} colorScheme="blue" onClick={onOpen}>
      تعديل المنتج
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#202020"}>
          <ModalHeader>تعديل المنتج</ModalHeader>
          <ModalCloseButton />
          <ModalBody  dir="rtl">
            <Formik
              initialValues={{
                name: product.name,
                priceAchat: product.priceAchat,
                priceVente: product.priceVente,
                stock: product.stock,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <VStack spacing={4} align="stretch">
                    <FormControl isInvalid={touched.name && errors.name}>
                    <FormLabel>اسم المنتج</FormLabel>
                    <Field as={Input} name="name" />
                    {touched.name && errors.name && <Text color={'#fb7575'}>{errors.name}</Text>}
                    </FormControl>
                    <FormControl
                      isInvalid={touched.priceAchat && errors.priceAchat}
                    >
                      <FormLabel>سعر الشراء (الوحدة)</FormLabel>
                      <Field as={Input} type="number" name="priceAchat" />
                      {touched.priceAchat && errors.priceAchat && (
                        <Text color={'#fb7575'}>{errors.priceAchat}</Text>
                      )}
                    </FormControl>
                    <FormControl
                      isInvalid={touched.priceVente && errors.priceVente}
                    >
                      <FormLabel>سعر البيع (الوحدة)</FormLabel>
                      <Field as={Input} type="number" name="priceVente" />
                      {touched.priceVente && errors.priceVente && (
                        <Text color={'#fb7575'}>{errors.priceVente}</Text>
                      )}
                    </FormControl>
                    <FormControl isInvalid={touched.stock && errors.stock}>
                      <FormLabel>المخزون</FormLabel>
                      <Field as={Input} type="number" name="stock" />
                      {touched.stock && errors.stock && (
                        <Text color={'#fb7575'}>{errors.stock}</Text>
                      )}
                    </FormControl>
                    <Button my={5} type="submit" colorScheme="blue">
                    تعديل المنتج
                    </Button>
                  </VStack>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateProduct;
