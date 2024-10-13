import React from "react";
import { Loader } from "lucide-react";
import clsx from "clsx";
import { PhotoUploadCardComponent } from "@/components/PhotoUploadCard/PhotoUploadCard";
import { useFormCategory } from "@/hooks/form/useFormCategory";

interface FormCategoryProps {
  onSubmit: (data: any) => void;
  isSuccess: boolean;
  isPending: boolean;
  initialValues?: any;
  btnString: string;
}

export const FormCategory = ({
  onSubmit,
  isSuccess,
  isPending,
  initialValues,
  btnString,
}: FormCategoryProps) => {
  const { form } = useFormCategory(initialValues, isSuccess);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-10 grid grid-cols-1 gap-9"
    >
      <div className="flex flex-col gap-9">
        {/* <!-- Input Fields --> */}

        <div className="h-30 rounded-lg border border-stroke bg-white p-4 shadow-md dark:border-strokedark dark:bg-boxdark">
          <div className="space-y-2">
            <label
              htmlFor="categoryName"
              className="text-gray-700 dark:text-gray-200 block text-sm font-medium"
            >
              Nom de la catégorie
            </label>
            <input
              id="categoryName"
              {...register("name")}
              type="text"
              placeholder="Vaisselle"
              className="border-gray-300 text-gray-900 dark:border-gray-600 dark:bg-gray-800 w-full rounded-md border bg-transparent px-4 py-2 transition focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:text-white dark:focus:border-primary"
            />
            {errors.name && (
              <span className="text-sm text-red">{errors.name.message}</span>
            )}
          </div>
        </div>
      </div>

      <section className="container mx-auto w-full items-center">
        {/* <div
          id="image-preview"
          className="bg-gray-100 border-gray-400 mx-auto  max-w-sm cursor-pointer items-center rounded-lg border-2 border-dashed  text-center"
        > */}
        <PhotoUploadCardComponent
          multiple={false}
          register={register("image")}
          setValue={setValue}
        />
        {/* </div> */}
        <span className="text-red">{errors.image?.message}</span>
      </section>
      <button
        className={clsx(
          "flex justify-center rounded bg-black-2 px-6 py-2 font-medium text-gray hover:bg-opacity-90",
          {
            "opacity-50": isPending,
          },
        )}
        type="submit"
        disabled={isPending}
      >
        {isPending ? <Loader className="animate-spin" /> : btnString}
      </button>
    </form>
  );
};
