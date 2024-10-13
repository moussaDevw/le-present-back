import { DashboardRight } from "@/components/DasboardRight/DashboardRight";
import { FormProduct } from "../FormProduct/FormProduct";
import { useAddProductData } from "@/hooks/useProductsData";
import { Fragment } from "react";
import { NotificationToast } from "@/components/Toast/Toast";

export const AddProduct = () => {
  const {
    mutate: addProduct,
    isPending,
    isSuccess,
    isError,
    error: errorAddProduct,
  } = useAddProductData();
  console.log(errorAddProduct);
  const onSubmit = (product: any) => {
    const formData = new FormData();

    formData.append("name", product.name);
    for (let productImage of product.images) {
      console.log(productImage);
      formData.append("images", productImage);
    }

    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("articleId", product.articleId);
    formData.append("quantity", product.quantity);

    addProduct(formData);
  };

  return (
    <Fragment>
      <DashboardRight className="w-150">
        <FormProduct
          onSubmit={onSubmit}
          isSuccess={isSuccess}
          isPending={isPending}
          btnString="Ajouter le produit"
        />
      </DashboardRight>
    </Fragment>
  );
};
