async function listarProductos() {
    const conexion = await fetch("http://localhost:3001/productos");
    const conexionConvertida = conexion.json();
    console.log("Me conecto y veo: ",conexionConvertida)
    return conexionConvertida;
}

export const productosAPI = {
    listarProductos
}