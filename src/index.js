import express from "express";
import bodyParser from "body-parser";
import registrationRoutes from "./routes/registrationRoutes.js";
import preferencesRoutes from "./routes/preferencesRoutes.js";
import newsRoutes from "./routes/newsRoute.js";

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
