import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getCategoryData = async () => {
  const response = await fetch("http://localhost:3000/article");
  const data = await response.json();
  return data;
};

const deleteArticle = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/article/${id}`, {
      method: "DELETE",
    });

    // Vérifie si la réponse n'est pas OK (code 200-299)
    if (!response.ok) {
      // Essaie de récupérer le message d'erreur du corps de la réponse
      const errorData = await response.json();

      // Lancer une erreur avec le message du serveur ou un message par défaut
      throw new Error(errorData.message);
    }

    return response;
  } catch (error) {
    // Gestion des erreurs réseau ou autres exceptions
    console.error("Erreur réseau ou autre:", error);
    throw error;
  }
};

export const useArticlesData = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: getCategoryData,
    // refetchInterval: 2000,
  });
};

const addArticle = async (article: any) => {
  const response = await fetch("http://localhost:3000/article", {
    method: "POST",
    body: article,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response;
};

export const useAddArticleData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addArticle,
    onSuccess: () => queryClient.invalidateQueries("category"),
  });
};

export const useDeleteArticleData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => queryClient.invalidateQueries("category"),
  });
};
