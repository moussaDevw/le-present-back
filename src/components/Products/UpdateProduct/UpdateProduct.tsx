import { DashboardRight } from "@/components/DasboardRight/DashboardRight";
import { FormProduct } from "../FormProduct/FormProduct";
import { useProductDataById } from "@/hooks/useProductsData";
import Loader from "@/components/common/Loader";
import { Product } from "@/types/product";

interface UpdateProductProps {
  productId: string;
}

export const UpdateProduct = ({ productId }: UpdateProductProps) => {
  const {
    data: product,
    isLoading,
    isError,
    error,
    isSuccess,
    isPending,
  } = useProductDataById(productId);

  if (isLoading) return <Loader />;

  if (isError) return <div>{error.message}</div>;

  const onSubmit = (product: any) => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("articleId", product.articleId);
    for (let image of product.images) {
      formData.append("images", image);
    }
  };

  return (
    <DashboardRight className="w-150">
      <FormProduct
        initialValues={product}
        isSuccess={isSuccess}
        isPending={isPending}
        btnString="Modifier le produit"
        onSubmit={onSubmit}
      />
    </DashboardRight>
  );
};
