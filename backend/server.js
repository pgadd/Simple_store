import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from "cors";
import path from "path";

import productRoutes from './routes/products.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000

const __dirname = path.resolve();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ['http://localhost:5173', 'https://simple-store-59y4.onrender.com', "http://localhost:3000"];
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

app.use(express.json()); // allows us to accpet json data in re.body

app.use("/api/products", productRoutes); //productRoutes is jus the name we gave middleware, it can be anything. Just need to update the import up top name accordingly.


if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("/*splat", (req, res) => {
    res.sendFile(path.resolve(__dirname, "fronted", "dist", "index.html"));
    })
}


app.listen(port, () => {
    connectDB();
    console.log('Server is running on port http://localhost:' + port);
});