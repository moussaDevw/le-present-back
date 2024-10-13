import { useArticleData, useUpdateArticleData } from "@/hooks/useArticlesData";
import { FormCategory } from "../FormCategory/FormCategory";
import Loader from "@/components/common/Loader";
import { useEffect } from "react";
import { useRootedContext } from "@/hooks/context/useContext";
import { DashboardRight } from "@/components/DasboardRight/DashboardRight";

interface UpdateCategoryProps {
  articleId: string;
}

export const UpdateCategory = ({ articleId }: UpdateCategoryProps) => {
  const { mutate, isPending, isSuccess } = useUpdateArticleData();
  const { setIsDrawerOpen } = useRootedContext();
  const {
    data: article,
    isLoading,
    isError,
    error,
    isSuccess: isArticleSuccess,
  } = useArticleData(articleId);

  useEffect(() => {
    if (isSuccess) {
      setIsDrawerOpen(false);
    }
  }, [isSuccess, setIsDrawerOpen]);

  if (isLoading) return <Loader />;

  if (isError) return <div>Error: {error.message}</div>;

  const onSubmit = (article: any) => {
    const formData = new FormData();
    formData.append("name", article.name);
    formData.append("image", article.image[0]);

    mutate({ article: formData, id: articleId });
  };

  return (
    <DashboardRight>
      <FormCategory
        onSubmit={onSubmit}
        isSuccess={isSuccess}
        isPending={isPending}
        btnString="Modifier une catégorie"
        initialValues={article}
      />
    </DashboardRight>
  );
};
