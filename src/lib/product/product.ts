export async function getProductById(id: string) {
    try {
      const res = await fetch(`http://localhost:3001/product/${id}`, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        console.error(`Erro ao buscar produto: ${res.statusText}`);
        return null;
      }
  
      return await res.json(); 
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
      return null;
    }
  }