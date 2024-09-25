"use client";
import { UpdateCategory } from "@/components/category/UpdateCategory/UpdateCategory";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function UpdateCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <DefaultLayout>
      <UpdateCategory articleId={params.id} />
    </DefaultLayout>
  );
}
