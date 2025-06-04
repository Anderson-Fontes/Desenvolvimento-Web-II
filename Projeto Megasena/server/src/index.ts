import express from "express";
import megaRouter from "./routes/mega";

const app = express();
const PORT = 3006;

app.use(express.json());

app.use("/", megaRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});