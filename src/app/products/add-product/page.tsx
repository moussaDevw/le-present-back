"use client";

import Calendar from "@/components/Calender";
// import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import MultiSelect from "@/components/FormElements/MultiSelect";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import CheckboxFour from "@/components/Checkboxes/CheckboxFour";
import CheckboxFive from "@/components/Checkboxes/CheckboxFive";
import DatePickerTwo from "@/components/FormElements/DatePicker/DatePickerTwo";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import SwitcherOne from "@/components/Switchers/SwitcherOne";
import SwitcherTwo from "@/components/Switchers/SwitcherTwo";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import SwitcherFour from "@/components/Switchers/SwitcherFour";

// export const metadata: Metadata = {
//   title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
// };
let renderCount = 0;
const AddProductPage = () => {
  const schema = yup
    .object({
      name: yup
        .string()
        .required("Name is required")
        .matches(
          /^[a-zA-Z0-9_]+$/,
          "Le nom d'utilisateur ne doit contenir que des lettres, des chiffres ou des underscores",
        ),
      price: yup.number().positive().integer().required("Price is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      price: 0,
      //   image: "",
    },
  });

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Input Fields
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Default Input
                </label>
                <input
                  type="text"
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Active Input
                </label>
                <input
                  type="text"
                  placeholder="Active Input"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Disabled label
                </label>
                <input
                  type="text"
                  placeholder="Disabled label"
                  disabled
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                />
              </div>
            </div>
          </div>

          {/* <!-- File upload --> */}
        </div>
      </div>
      {/* <p>{renderCount}</p>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <input
          {...register("name", { required: "ce champ est obligatoire" })}
          type="text"
          placeholder="Name"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <input
          {...register("price", {
            required: "ce champ est obligatoire",
            minLength: {
              value: 4,
              message: "ce champ doit contenir au moins 4 caractères",
            },
          })}
          type="text"
          placeholder="Price"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
       
        <input type="submit" value="Submit" />
      </form> */}
    </DefaultLayout>
  );
};

export default AddProductPage;
