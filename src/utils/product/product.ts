import api from "@/utils/api"; 

export async function getProductById(id: number) {
  try {
    const res = await api.get(`/product/${id}`);
    return res.data.product;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }
}