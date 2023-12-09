const fs = require("fs");
const rutaArchivo = "dato.txt";

const lectura = (directorio, callback) => {
  fs.readFile(directorio, "utf8", async (error, contenido) => {
    if (error) {
      console.error("Error al leer el archivo:", error);
      return;
    }
    const result = await callback(contenido);
    console.log(result);
  });
};

const mayuscula = (informacion) => {
  return new Promise((resolve) => resolve(informacion.toUpperCase()));
};

lectura(rutaArchivo, mayuscula);
