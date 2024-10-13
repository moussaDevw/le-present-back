import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getProductData = async () => {
  try {
    const response = await fetch("http://localhost:3000/product");
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    throw error;
  }
};

const getProductDataById = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/product/${id}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const addProductData = async (product: any) => {
  try {
    const response = await fetch("http://localhost:3000/product", {
      method: "POST",
      body: product,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const deleteProductData = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/product/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const useProductsData = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductData,
  });
};

export const useProductDataById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDataById(id),
  });
};

export const useAddProductData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProductData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useDeleteProductData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
