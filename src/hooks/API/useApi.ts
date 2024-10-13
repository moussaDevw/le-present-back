import { QueryKey, useQuery } from "@tanstack/react-query";

const API_BASE_URL = "http://localhost:3000";

async function fetchData(endpoint: string) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}
export const useApi = (endpoint: string, queryKey: QueryKey) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchData(endpoint),
  });
};
