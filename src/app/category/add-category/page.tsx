"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddArticleData } from "@/hooks/useArticlesData";
import ListCategory from "@/components/category/ListCategory/ListCategory";
import { useEffect, useState } from "react";
import { Loader, Upload } from "lucide-react";
import clsx from "clsx";

const AddCategoryPage = () => {
  const [imagePreview, setImagePreview] = useState<string>("");

  const schema = yup
    .object({
      name: yup
        .string()
        .required("Le nom de la catégorie est obligatoire")
        .matches(
          /^[a-zA-Zàâäçéèêëîïôöùûüÿ]+$/,
          "Le nom de la catégorie ne peut contenir que des lettres.",
        ),
      image: yup
        .mixed()
        .test("fileSize", "l'image est obligatoire", (value: any) => {
          return value && value[0]?.size > 0;
        })
        .test(
          "fileSize",
          "L'image dois être inférieure à 2MB",
          (value: any) => {
            return value && value[0]?.size <= 2000000;
          },
        )
        .test(
          "fileType",
          "Seuls les formats JPEG et PNG sont acceptés",
          (value: any) => {
            return (
              value && ["image/jpeg", "image/png"].includes(value[0]?.type)
            );
          },
        ),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      image: "",
    },
  });

  const nameValue = useWatch({ control, name: "name" });

  const isButtonDisabled = Boolean(nameValue) && Boolean(imagePreview.length);

  const { mutate, isPending, isSuccess } = useAddArticleData();

  const onSubmit = (article: any) => {
    const formData = new FormData();
    formData.append("name", article.name);
    formData.append("image", article.image[0]);

    mutate(formData);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      setImagePreview("");
    }
  }, [isSuccess]);

  return (
    <DefaultLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-10 grid grid-cols-2 gap-9 sm:grid-cols-2"
      >
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Ajouter une catégorie
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nom de la catégorie
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Vaisselle"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="text-red">{errors.name?.message}</span>
              </div>
            </div>
          </div>

          <button
            className={clsx(
              "flex justify-center rounded bg-black px-6 py-2 font-medium text-gray hover:bg-opacity-90",
              {
                "opacity-50": !isButtonDisabled || isPending,
              },
            )}
            type="submit"
            disabled={!isButtonDisabled || isPending}
          >
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              "Ajouter la catégorie"
            )}
          </button>
        </div>

        <section className="container mx-auto w-full items-center">
          <div className="mx-auto max-w-sm items-center overflow-hidden rounded-lg bg-white shadow-md">
            <div className="px-4">
              <div
                id="image-preview"
                className="bg-gray-100 border-gray-400 mx-auto mb-4 max-w-sm cursor-pointer items-center rounded-lg border-2 border-dashed p-6 text-center"
              >
                <input
                  {...register("image")}
                  id="upload"
                  type="file"
                  placeholder="Vaisselle"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                  className="opacity-0"
                />
                {imagePreview ? (
                  <label htmlFor="upload">
                    <img
                      src={imagePreview}
                      alt="Image preview"
                      className="mx-auto max-h-48 rounded-lg"
                    />
                  </label>
                ) : (
                  <label htmlFor="upload" className="cursor-pointer">
                    <Upload className="mx-auto" />
                    <h5 className="text-gray-700 mb-2 text-xl font-bold tracking-tight">
                      Télécharger une photo
                    </h5>
                    <p className="text-gray-400 text-sm font-normal md:px-6">
                      La taille de la photo choisie doit être inférieure à{" "}
                      <b className="text-gray-600">2mb</b>
                    </p>
                    <p className="text-gray-400 text-sm font-normal md:px-6">
                      et doit être au format{" "}
                      <b className="text-gray-600">JPG, PNG</b> .
                    </p>
                    <span
                      id="filename"
                      className="text-gray-500 bg-gray-200 z-50"
                    ></span>
                  </label>
                )}
              </div>
              <span className="text-red">{errors.image?.message}</span>
            </div>
          </div>
        </section>
      </form>
      <ListCategory />
    </DefaultLayout>
  );
};

export default AddCategoryPage;
