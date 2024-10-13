import { PhotoUploadCardComponent } from "@/components/PhotoUploadCard/PhotoUploadCard";
import { useFormProduct } from "@/hooks/form/useFormProduct";
import { useArticlesData } from "@/hooks/useArticlesData";
import clsx from "clsx";
import { Loader } from "lucide-react";
import { useMemo } from "react";

interface FormCategoryProps {
  onSubmit: (data: any) => void;
  isSuccess: boolean;
  isPending: boolean;
  initialValues?: any;
  btnString: string;
}

export const FormProduct = ({
  onSubmit,
  isSuccess,
  isPending,
  initialValues,
  btnString,
}: FormCategoryProps) => {
  const { form } = useFormProduct(initialValues, isSuccess);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const { data: categories, isSuccess: isSuccesCategorie } = useArticlesData();
  const categoriesFilter = useMemo(() => {
    if (initialValues && isSuccesCategorie) {
      return categories.filter((category) => category.id !== initialValues.id);
    }
  }, [initialValues, isSuccesCategorie]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mb-10 grid max-w-4xl grid-cols-1 gap-9"
    >
      <div className="flex flex-col gap-9">
        <div className="grid grid-cols-1 gap-6 rounded-lg border border-stroke bg-white p-8 shadow-lg dark:border-strokedark dark:bg-boxdark md:grid-cols-2">
          <div className="space-y-4">
            <label
              htmlFor="productName"
              className="text-gray-700 dark:text-gray-200 block text-sm font-medium"
            >
              Nom du produit
            </label>
            <input
              id="productName"
              {...register("name")}
              type="text"
              placeholder="Entrez le nom du produit"
              className="border-gray-300 text-gray-900 dark:border-gray-600 dark:bg-gray-800 w-full rounded-md border bg-transparent px-4 py-3 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 dark:text-white"
            />
            {errors.name && (
              <span className="text-sm text-red">{errors.name.message}</span>
            )}
          </div>
          <div className="space-y-4">
            <label
              htmlFor="category"
              className="text-gray-700 dark:text-gray-200 block text-sm font-medium"
            >
              Catégorie
            </label>
            <select
              id="category"
              {...register("articleId")}
              className="border-gray-300 text-gray-900 dark:border-gray-600 dark:bg-gray-800 w-full rounded-md border bg-transparent px-4 py-3 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 dark:text-white"
            >
              {initialValues && initialValues?.article ? (
                <option value={initialValues.article.id}>
                  {initialValues.article.name}
                </option>
              ) : (
                <option value="">Sélectionnez une catégorie</option>
              )}

              {categoriesFilter?.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {errors.articleId && (
              <span className="text-sm text-red">
                {errors.articleId.message}
              </span>
            )}
          </div>
          <div className="space-y-4">
            <label
              htmlFor="price"
              className="text-gray-700 dark:text-gray-200 block text-sm font-medium"
            >
              Prix
            </label>
            <input
              id="price"
              {...register("price")}
              type="number"
              placeholder="Entrez le prix"
              className="border-gray-300 text-gray-900 dark:border-gray-600 dark:bg-gray-800 w-full rounded-md border bg-transparent px-4 py-3 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 dark:text-white"
            />
            {errors.price && (
              <span className="text-sm text-red">{errors.price.message}</span>
            )}
          </div>
          <div className="space-y-4">
            <label
              htmlFor="quantity"
              className="text-gray-700 dark:text-gray-200 block text-sm font-medium"
            >
              Quantité
            </label>
            <input
              id="quantity"
              {...register("quantity")}
              type="number"
              placeholder="Entrez la quantité"
              className="border-gray-300 text-gray-900 dark:border-gray-600 dark:bg-gray-800 w-full rounded-md border bg-transparent px-4 py-3 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 dark:text-white"
            />
            {errors.quantity && (
              <span className="text-sm text-red">
                {errors.quantity.message}
              </span>
            )}
          </div>
          <div className="col-span-full space-y-4">
            <label
              htmlFor="description"
              className="text-gray-700 dark:text-gray-200 block text-sm font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="Description du produit"
              rows={4}
              className="border-gray-300 text-gray-900 dark:border-gray-600 dark:bg-gray-800 w-full rounded-md border bg-transparent px-4 py-3 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 dark:text-white"
            />
            {errors.description && (
              <span className="text-sm text-red">
                {errors.description.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <section className="container mx-auto w-full items-center">
        <PhotoUploadCardComponent
          multiple={true}
          register={register("images")}
          setValue={setValue}
        />
        {errors.images && (
          <span className="mt-2 text-sm text-red">{errors.images.message}</span>
        )}
      </section>

      <button
        className={clsx(
          "flex items-center justify-center rounded-full bg-black-2 px-8 py-3 font-medium text-white transition-all duration-300 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
          {
            "cursor-not-allowed opacity-50": isPending,
          },
        )}
        type="submit"
        disabled={isPending}
      >
        {isPending ? <Loader className="mr-2 animate-spin" /> : null}
        {btnString}
      </button>
    </form>
  );
};
