import { useArticleData, useUpdateArticleData } from "@/hooks/useArticlesData";
import { FormCategory } from "../FormCategory/FormCategory";
import Loader from "@/components/common/Loader";
import { ModalL } from "@/components/Modal/Modal";
import { useContext, useEffect } from "react";
import { RootedContext } from "@/hooks/context/useContext";

interface UpdateCategoryProps {
  articleId: string;
}

export const UpdateCategory = ({ articleId }: UpdateCategoryProps) => {
  const { mutate, isPending, isSuccess } = useUpdateArticleData();
  const { setOpenModal } = useContext(RootedContext);
  const {
    data: article,
    isLoading,
    isError,
    error,
    isSuccess: isArticleSuccess,
  } = useArticleData(articleId);

  useEffect(() => {
    if (isSuccess) {
      setOpenModal(false);
    }
  }, [isSuccess, setOpenModal]);

  if (isLoading) return <Loader />;

  if (isError) return <div>Error: {error.message}</div>;

  const onSubmit = (article: any) => {
    const formData = new FormData();
    formData.append("name", article.name);
    formData.append("image", article.image[0]);

    mutate({ article: formData, id: articleId });
  };

  return (
    <ModalL title="Modifier la catégorie" cancelButton="Annuler">
      <FormCategory
        title="Modifier la catégorie"
        onSubmit={onSubmit}
        isSuccess={isSuccess}
        isPending={isPending}
        btnString="Modifier une catégorie"
        initialValues={article}
      />
    </ModalL>
  );
};
