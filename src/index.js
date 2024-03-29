import express from "express";
import bodyParser from "body-parser";
import registrationRoutes from "./routes/registrationRoutes.js";
import preferencesRoutes from "./routes/preferencesRoutes.js";
import newsRoutes from "./routes/newsRoute.js";
import dotenv from "dotenv-flow";

dotenv.config();

const env = process.env.NODE_ENV || "dev";
if (env === "test") {
  process.env.USER_FILE_DB_NAME = "data_test.json";
}
if (env === "dev") {
  process.env.USER_FILE_DB_NAME = "data.json";
}

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(registrationRoutes);
app.use(preferencesRoutes);
app.use(newsRoutes);

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is listing on ${PORT}`);
  } else {
    console.log("some error occured");
  }
});

export default app;
