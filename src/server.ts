import app from "./utils/config/server";

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
