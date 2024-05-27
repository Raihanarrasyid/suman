// import packages
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { GridFSBucket } from "mongodb";
import uploadProductGrid from "./middleware/productUpGrid.middleware.js";

// import controllers
import { register } from "./controllers/auth.controller.js";
import { addProduct } from "./controllers/admin.controller.js";
import { updateProduct } from "./controllers/admin.controller.js";

// import routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import orderRoutes from "./routes/order.routes.js";
import addressRoutes from "./routes/address.routes.js";

// import middleware
import { verifyToken } from "./middleware/auth.middleware.js";
import { verifyAdmin } from "./middleware/admin.middleware.js";

// configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// cors
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods: "GET, POST, PUT, DELETE, PATCH",
};
app.use(cors(corsOptions));

/////////////////////////
// Middleware gridfs
const mongoURI =
  "mongodb+srv://user:user123@cluster0.poki64c.mongodb.net/?retryWrites=true&w=majority";

const conn = mongoose.createConnection(mongoURI);

let bucket;

conn.once("open", () => {
  bucket = new GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
});

app.get("/assets/products/:fileName", (req, res) => {
  const fileName = req.params.fileName;

  const downloadStream = bucket.openDownloadStreamByName(fileName);
  downloadStream.on("error", () => {
    return res.status(404).json({ message: "File not found" });
  });

  res.setHeader("Content-Type", "image/png");

  downloadStream.pipe(res);
});
app.get("/assets/payments/:fileName", (req, res) => {
  const fileName = req.params.fileName;

  const downloadStream = bucket.openDownloadStreamByName(fileName);
  downloadStream.on("error", () => {
    return res.status(404).json({ message: "File not found" });
  });

  res.setHeader("Content-Type", "image/png");

  downloadStream.pipe(res);
});
/////////////////////////
app.post("/auth/register", register);
// add new product
app.post(
  "/admin/product",
  verifyToken,
  verifyAdmin,
  uploadProductGrid,
  addProduct
);
app.put(
  "/admin/product/:id",
  verifyToken,
  verifyAdmin,
  uploadProductGrid,
  updateProduct
);

// routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/admin", adminRoutes);
app.use("/order", orderRoutes);
app.use("/address", addressRoutes);

// mongoose setup
// const PORT = process.env.PORT || 6001;
mongoose
  .connect(
    "mongodb+srv://user:user123@cluster0.poki64c.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(3001, () => {
      console.log(`Server running on port: ${3001}`);
    });
  })
  .catch((error) => console.log(error.message));
