const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas principales
app.use("/api/posts", postRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.send("API de Posts funcionando 🚀");
});

// Middleware de ruta no encontrada
app.use((req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Error del servidor.";
  console.error({ statusCode, message });
  res.status(statusCode).json({ error: message });
});

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
