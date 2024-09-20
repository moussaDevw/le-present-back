import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ListCategory from "@/components/category/ListCategory/ListCategory";

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const ProductPage = () => {
  return (
    <DefaultLayout>
      <ListCategory />
    </DefaultLayout>
  );
};

export default ProductPage;
