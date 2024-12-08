import express from "express";
import { json } from "body-parser";
import userRoutes from "./routes/user.routes"
import bookRoutes from "./routes/book.routes"
import cors from "cors";
import errorHandler from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/users", userRoutes)
app.use("/books", bookRoutes)

app.use((req, res) => {
	res.status(404).send({ error: "Page Not Found!", success: false });
});

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
