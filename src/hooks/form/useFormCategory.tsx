import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRootedContext } from "@/hooks/context/useContext";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Le nom de la catégorie est obligatoire")
    .matches(
      /^[a-zA-Zàâäçéèêëîïôöùûüÿ\s]+$/,
      "Le nom de la catégorie ne peut contenir que des lettres et des espaces.",
    ),
  image: yup
    .mixed()
    .test(
      "required",
      "L'image de la catégorie est obligatoire",
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

export const useFormCategory = (initialValues: any, isSuccess: boolean) => {
  const { setPhotos, setExistingPhotoUrl, isDrawerOpen } = useRootedContext();
  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      image: [],
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.setValue("name", initialValues.name);
      setExistingPhotoUrl([initialValues.image]);
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
