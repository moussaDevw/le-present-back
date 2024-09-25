import { useAddArticleData } from "@/hooks/useArticlesData";
import { FormCategory } from "../FormCategory/FormCategory";

export const AddCategory = () => {
  const { mutate, isPending, isSuccess } = useAddArticleData();

  const onSubmit = (article: any) => {
    const formData = new FormData();
    formData.append("name", article.name);
    formData.append("image", article.image[0]);

    mutate(formData);
  };

  return (
    <FormCategory
      title="Ajouter une catégorie"
      onSubmit={onSubmit}
      isSuccess={isSuccess}
      isPending={isPending}
      btnString="Ajouter la catégorie"
    />
  );
};
