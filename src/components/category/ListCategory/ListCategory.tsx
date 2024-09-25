"use client";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import {
  Delete,
  DeleteIcon,
  Eye,
  Loader2,
  LoaderCircle,
  SquarePen,
  Trash2,
} from "lucide-react";
import Loader from "@/components/common/Loader";
import Image from "next/image";
import { useArticlesData, useDeleteArticleData } from "@/hooks/useArticlesData";
import { NotificationToast } from "@/components/Toast/Toast";
import { Article } from "@/types/article";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { UpdateCategory } from "../UpdateCategory/UpdateCategory";
import { useContext, useState } from "react";
import { RootedContext } from "@/hooks/context/useContext";

const ListCategory = () => {
  const { data: categoryData, isLoading, isError, error } = useArticlesData();
  const [articleId, setArticleId] = useState<string>("");
  const { setOpenModal } = useContext(RootedContext);

  const handleUpdateCategory = (id: string) => {
    setArticleId(id);
    setOpenModal(true);
  };

  const {
    mutate: deleteArticle,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
    isPending: isDeletePending,
  } = useDeleteArticleData();

  if (isLoading) return <Loader />;

  if (isError) return <p>{error.message}</p>;

  return (
    <div className="relative w-full rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
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

      <UpdateCategory articleId={articleId} />

      <Table>
        <TableCaption>Liste des articles</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Image</TableHead>
            <TableHead className="text-center">Nom de l'article</TableHead>
            <TableHead className="text-center">Nombre de produits</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-0">
          {categoryData.map((article: Article) => (
            <TableRow key={article.id}>
              <TableCell>
                <div className="h-13 w-25 overflow-hidden rounded-lg">
                  {article.image.url && (
                    <Image
                      src={article.image.url}
                      alt="description"
                      layout="fixed"
                      width={80}
                      height={80}
                      className="rounded object-cover"
                    />
                  )}
                </div>
              </TableCell>
              <TableCell className="text-center">{article.name}</TableCell>
              <TableCell className="text-center">
                {article.products.length}
              </TableCell>
              <TableCell>
                <div className="mx-auto flex w-max items-baseline gap-4">
                  {isDeletePending ? (
                    <LoaderCircle className="size-4 animate-spin cursor-wait text-black" />
                  ) : (
                    <Trash2
                      onClick={() => deleteArticle(article.id)}
                      className="size-4 cursor-pointer text-red"
                    />
                  )}
                  <SquarePen
                    className="size-4 cursor-pointer text-black"
                    onClick={() => handleUpdateCategory(article.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListCategory;
