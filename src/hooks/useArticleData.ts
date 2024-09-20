import { useQuery } from "@tanstack/react-query";

const fetchArticleData = async (articleId: number) => {
  const response = await fetch(`http://localhost:3000/article/${articleId}`);
  const data = await response.json();
  return data;
};

export const useArticleData = (articleId: number) => {
  return useQuery({
    queryKey: ["article", articleId],
    queryFn: () => fetchArticleData(articleId),
  });
};
