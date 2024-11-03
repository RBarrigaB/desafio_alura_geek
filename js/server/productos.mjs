import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function listarProductos() {
  const conexion = await fetch("http://localhost:3001/productos");
  const conexionConvertida = await conexion.json();
  return conexionConvertida;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dirPath = path.resolve(__dirname, "../../img/productos");
    console.log("Guardando en la ruta:", dirPath);
    // Se crea la carpeta si no existe
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    cb(null, dirPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//Endpoint para agregar imagen en carpeta de img/productos
app.post("/upload", upload.single("image"), async (req, res) => {
  const { id,name, price } = req.body;
  const filePath = `img/productos/${req.file.filename}`;

  // Estructura del producto a enviar a json-server
  const productData = {
    id:await setId(),
    name: name,
    price: price,
    image: filePath,
  };

  try {
    const response = await fetch("http://localhost:3001/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok)
      throw new Error("Error al guardar el producto en json-server");

    const responseData = await response.json();
    res.json({
      message: "Producto guardado exitosamente",
      product: responseData,
    });
  } catch (error) {
    console.error("Error al guardar el producto en json-server:", error);
    res.status(500).json({ message: "Error al guardar el producto" });
  }
});

// Endpoint para eliminar un producto por id
app.delete("/productos/:id", async (req, res) => {

  const id = req.params.id;
  try {
    const productResponse = await fetch(`http://localhost:3001/productos/${id}`);
    if (!productResponse.ok) {
      throw new Error(`Error al obtener el producto con id ${id}`);
    }
    const product = await productResponse.json();
    // Ruta de la imagen a eliminar
    const imagePath = path.resolve(__dirname, "../../", product.image);
    // Eliminar la imagen del sistema de archivos
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error al eliminar la imagen:", err);
      }
    });

    // Ahora eliminamos el producto de json-server
    const response = await fetch(`http://localhost:3001/productos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el producto con id ${id}`);
    }

    res.json({
      message: `Producto con id ${id} eliminado exitosamente`,
    });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
});

//Se crea producto en json-server
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

app.listen(3000, () => {
  console.log("Servidor Express ejecutándose en http://localhost:3000");
});

const setId = async () => {
  try {
    const response = await fetch("http://localhost:3001/productos");
    const productos = await response.json();
    // Encontrar el id más alto y sumar 1
    const maxId = Math.max(...productos.map(producto => producto.id));
    return (maxId + 1).toString();
  } catch(error) {
    console.error("Error capturando el id del producto: ",error);
  }
}
