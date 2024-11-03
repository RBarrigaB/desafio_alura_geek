// api.js
export async function listarProductos() {
    const response = await fetch("http://localhost:3001/productos");
    if (!response.ok) throw new Error("Error al listar productos");
    return await response.json();
  }
  
  export async function crearProducto(name, price, imageFile) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", imageFile);
    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Error al crear producto");
      return await response.json();
    } catch (error) {
      console.error("Error en crearProducto:", error);
      throw error;
    }
  }

  export async function eliminarProducto(id) {
    const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE"
    });
   if(response.ok) {
    alert("Producto eliminado correctamente");
    listarProductos();
    return true;
   } else {
    alert("Error al eliminar el producto");
    return false;
   }
    
  }
  

  