"use client";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import {
  Delete,
  DeleteIcon,
  Eye,
  Loader2,
  LoaderCircle,
  Trash2,
} from "lucide-react";
import Loader from "@/components/common/Loader";
import Image from "next/image";
import { useArticlesData, useDeleteArticleData } from "@/hooks/useArticlesData";
import { NotificationToast } from "@/components/Toast/Toast";
import { Article } from "@/types/article";

const ListCategory = () => {
  const { data: categoryData, isLoading, isError, error } = useArticlesData();

  const {
    mutate: deleteArticle,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
    isPending: isDeletePending,
  } = useDeleteArticleData();

  if (isLoading) return <Loader />;

  if (isError) return <p>{error.message}</p>;
  console.log(isDeleteError);
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {isDeleteSuccess && (
        <NotificationToast
          message="La catégorie a été supprimée"
          position="top-right"
          type="success"
        />
      )}

      {isDeleteError && (
        <NotificationToast
          message={deleteError.message}
          type="error"
          position="top-right"
        />
      )}
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Liste des categories
        </h4>
      </div>

      <div className="gird w-full grid-cols-6 border-t border-stroke bg-red px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5">
        <div className="flex items-center">
          <p className="font-medium">Image</p>
        </div>
        <div className="hidden items-center sm:flex">
          <p className="font-medium">Nom du category</p>
        </div>
        <div className="hidden items-center sm:flex">
          <p className="font-medium">Quantité de produits</p>
        </div>
        <div className="flex items-center">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {categoryData.map((category: Article, key: number) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-3 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div>
            <div>
              <div className="h-28 w-28 rounded-md">
                {category.image.url && (
                  <Image
                    src={category.image.url}
                    width={112}
                    height={112}
                    alt={category.name || "article Image"}
                    quality={100}
                    className="bg-gray-300 h-full w-full rounded-lg object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-black dark:text-white">
              {category.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-black dark:text-white">
              {category.products.length}
            </p>
          </div>
          <div>
            <p>
              {isDeletePending ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2
                  className="h-4 w-4 cursor-pointer text-red"
                  onClick={() => deleteArticle(category.id)}
                />
              )}
              <Eye className="h-4 w-4" />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListCategory;
