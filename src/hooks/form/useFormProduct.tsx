import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRootedContext } from "@/hooks/context/useContext";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Le nom du produit est obligatoire")
    .matches(
      /^[a-zA-Zàâäçéèêëîïôöùûüÿ\s]+$/,
      "Le nom du produit ne peut contenir que des lettres et des espaces.",
    ),
  price: yup.number().required("Le prix du produit est obligatoire"),
  description: yup.string().nullable().notRequired(),
  articleId: yup.string().required("La catégorie du produit est obligatoire"),
  quantity: yup
    .number()
    .required("La quantité du produit est obligatoire")
    .min(1, "La quantité du produit doit être supérieure à 0"),
  images: yup
    .mixed()
    .test(
      "required",
      "Le produit dois avoir minimum une image",
      function (value: any) {
        return value && value.length > 0;
      },
    )
    .test(
      "fileSize",
      "L'image ne doit pas dépasser 2 Mo",
      function (value: any) {
        return !value || (value && value[0]?.size <= 2 * 1024 * 1024);
      },
    )
    .test(
      "fileType",
      "Le type de fichier doit être PNG, JPG ou JPEG",
      function (value: any) {
        return (
          !value ||
          (value &&
            ["image/png", "image/jpg", "image/jpeg"].includes(value[0]?.type))
        );
      },
    ),
});

export const useFormProduct = (initialValues: any, isSuccess: boolean) => {
  const { setPhotos, setExistingPhotoUrl } = useRootedContext();
  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      images: [],
      price: undefined,
      description: "",
      articleId: "",
      quantity: undefined,
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.setValue("name", initialValues.name);
      form.setValue("price", initialValues.price);
      form.setValue("description", initialValues.description);
      form.setValue("articleId", initialValues.article);
      form.setValue("quantity", initialValues.quantity);
      setExistingPhotoUrl(initialValues.images);
    }
  }, [initialValues, form.setValue]);

  useEffect(() => {
    if (!initialValues && isSuccess) {
      form.reset();
      setPhotos([]);
    } else if (initialValues && isSuccess) {
      return;
    }
  }, [isSuccess, initialValues, form.reset, setPhotos]);

  return {
    form,
  };
};
