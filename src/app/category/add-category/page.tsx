"use client";
import { AddCategory } from "@/components/category/AddCategory/AddCategory";
import ListCategory from "@/components/category/ListCategory/ListCategory";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const AddCategoryPage = () => {
  return (
    <DefaultLayout>
      <AddCategory />
      <div className="mt-10">
        <ListCategory />
      </div>
    </DefaultLayout>
  );
};

export default AddCategoryPage;
