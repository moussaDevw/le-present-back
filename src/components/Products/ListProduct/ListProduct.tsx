"use client";

import { NotificationToast } from "@/components/Toast/Toast";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRootedContext } from "@/hooks/context/useContext";
import { useDeleteProductData, useProductsData } from "@/hooks/useProductsData";
import { Product } from "@/types/product";
import { LoaderCircle, PlusIcon, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { AddProduct } from "../AddProduct/AddProduct";
import { UpdateProduct } from "../UpdateProduct/UpdateProduct";
import Loader from "@/components/common/Loader";

const ListProduct = () => {
  const { data: products, isLoading, isError, error } = useProductsData();
  const [productId, setProductId] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const { setIsDrawerOpen, isDrawerOpen, setExistingPhotoUrl } =
    useRootedContext();
  const {
    mutate: deleteProduct,
    isPending: isDeletePending,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    error: deleteError,
  } = useDeleteProductData();

  useEffect(() => {
    if (!isDrawerOpen) {
      setSelectedProductId("");
      setExistingPhotoUrl([]);
    }
  }, [isDrawerOpen]);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {error.message}</div>;

  const handleDeleteProduct = async (productId: string) => {
    setProductId(productId);
    await deleteProduct(productId);
  };

  const handleUpdateProduct = (productId: string) => {
    setSelectedProductId(productId);
    setIsDrawerOpen(true);
  };

  return (
    <Fragment>
      {isDeleteSuccess && (
        <NotificationToast
          message="Le produit a été supprimé avec succès"
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

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Liste des catégories</h2>
        <Button
          className="hover:bg-primary-dark bg-black-2 text-white"
          onClick={() => setIsDrawerOpen(true)}
        >
          Ajouter un produit <PlusIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <Table className="w-full bg-white">
        <TableCaption>Liste des produits</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Image</TableHead>
            <TableHead className="text-center">Nom du produit</TableHead>
            <TableHead className="text-center">Quantité</TableHead>
            <TableHead className="text-center">Prix</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="mx-auto h-20 w-20 overflow-hidden rounded-lg">
                  {product.images[0] && (
                    <Image
                      src={product.images[0].url}
                      alt={`Image de ${product.name}`}
                      width={80}
                      height={80}
                      className="h-full w-full rounded object-cover"
                    />
                  )}
                </div>
              </TableCell>
              <TableCell className="text-center font-medium">
                {product.name}
              </TableCell>
              <TableCell className="text-center">{product.quantity}</TableCell>
              <TableCell className="text-center">
                {product.price} FCFA
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-4">
                  {isDeletePending && product.id === productId ? (
                    <LoaderCircle className="h-4 w-4 animate-spin text-orange-500" />
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 text-red" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleUpdateProduct(product.id)}
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
      {isDrawerOpen && !selectedProductId && <AddProduct />}
      {isDrawerOpen && selectedProductId && (
        <UpdateProduct productId={selectedProductId} />
      )}
    </Fragment>
  );
};

export default ListProduct;
