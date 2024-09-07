import * as Yup from "yup";

export const validationSchema = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    priceAchat: Yup.number()
      .required("سعر الشراء مطلوب")
      .positive("يجب أن يكون سعر الشراء إيجابيًا"),
    priceVente: Yup.number()
      .required("سعر البيع مطلوب")
      .positive("يجب أن يكون سعر البيع إيجابيًا"),
    stock: Yup.number()
      .required("المخزون مطلوب")
      .integer("يجب أن يكون المخزون عددًا صحيحًا")
      .min(0, "لا يمكن أن يكون المخزون سالبًا"),
  });
