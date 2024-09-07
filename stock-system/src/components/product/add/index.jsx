import React from "react";
import axios from "axios";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  useToast,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { Formik, Field, Form } from "formik";
import { validationSchema } from "./validationSchema";
import { AddIcon } from "@chakra-ui/icons";

const AddProduct = ({ refreshProducts }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = (values, { resetForm }) => {
    axios
      .post("http://localhost:5000/products", {
        id: uuidv4(),
        ...values,
      })
      .then(() => {
        resetForm();
        refreshProducts();
        onClose();
        toast({
          title: "تمت إضافة المنتج.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "فشل في إضافة المنتج.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Button rightIcon={<AddIcon/>} colorScheme="blue" onClick={onOpen}>
        إضافة منتج
      </Button>
      <Modal  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#202020"}>
          <ModalHeader> إضافة منتج</ModalHeader>
          <ModalCloseButton />
          <ModalBody dir="rtl" >
            <Formik
              initialValues={{
                name: "",
                priceAchat: "",
                priceVente: "",
                stock: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <VStack spacing={4} align="stretch">
                    <FormControl isInvalid={touched.name && errors.name}>
                      <FormLabel>اسم المنتج</FormLabel>
                      <Field  as={Input} name="name" />
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
                      إضافة المنتج{" "}
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

export default AddProduct;
