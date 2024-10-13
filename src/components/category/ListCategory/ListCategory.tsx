"use client";
import { LoaderCircle, PlusIcon, SquarePen, Trash2 } from "lucide-react";
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
import { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRootedContext } from "@/hooks/context/useContext";
import { AddCategory } from "../AddCategory/AddCategory";
import { UpdateCategory } from "../UpdateCategory/UpdateCategory";

const ListCategory = () => {
  const { data: categoryData, isLoading, isError, error } = useArticlesData();
  const [articleId, setArticleId] = useState<string>("");
  const { setIsDrawerOpen, isDrawerOpen, setExistingPhotoUrl } =
    useRootedContext();
  const [selectedArticleId, setSelectedArticleId] = useState<string>("");

  const {
    mutate: deleteArticle,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
    isPending: isDeletePending,
  } = useDeleteArticleData();

  useEffect(() => {
    if (!isDrawerOpen) {
      setSelectedArticleId("");
      setExistingPhotoUrl([]);
    }
  }, [isDrawerOpen]);

  if (isLoading) return <Loader />;

  if (isError) return <p>Erreur : {error.message}</p>;

  const handleDeleteArticle = async (articleId: string) => {
    setArticleId(articleId);
    await deleteArticle(articleId);
  };

  const handleUpdateArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setIsDrawerOpen(true);
  };

  return (
    <Fragment>
      {isDeleteSuccess && (
        <NotificationToast
          message="La catégorie a été supprimée avec succès"
          position="top-right"
          type="success"
        />
      )}

      {isDeleteError && (
        <NotificationToast
          message={`Erreur lors de la suppression : ${deleteError.message}`}
          type="error"
          position="top-right"
        />
      )}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Liste des catégories</h2>
        <Button
          className="hover:bg-primary-dark bg-black-2 text-white"
          onClick={() => setIsDrawerOpen(true)}
        >
          Ajouter une catégorie <PlusIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Table className="w-full bg-white">
        <TableCaption>Liste des catégories</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Image</TableHead>
            <TableHead className="text-center">Nom de la catégorie</TableHead>
            <TableHead className="text-center">Nombre de produits</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoryData.map((article: Article) => (
            <TableRow key={article.id}>
              <TableCell>
                <div className="mx-auto h-20 w-20 overflow-hidden rounded-lg">
                  {article.image.url && (
                    <Image
                      src={article.image.url}
                      alt={`Image de ${article.name}`}
                      width={80}
                      height={80}
                      className="h-full w-full rounded object-cover"
                    />
                  )}
                </div>
              </TableCell>
              <TableCell className="text-center font-medium">
                {article.name}
              </TableCell>
              <TableCell className="text-center">
                {article.products.length}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-4">
                  {isDeletePending && article.id === articleId ? (
                    <LoaderCircle className="h-4 w-4 animate-spin text-orange-500" />
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteArticle(article.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 text-red" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleUpdateArticle(article.id)}
                    className="hover:text-primary-dark text-black"
                  >
                    <SquarePen className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isDrawerOpen && !selectedArticleId && <AddCategory />}
      {isDrawerOpen && selectedArticleId && (
        <UpdateCategory articleId={selectedArticleId} />
      )}
    </Fragment>
  );
};

export default ListCategory;
