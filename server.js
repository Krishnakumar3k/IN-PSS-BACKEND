import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./routes/laptops.routes.js";
import {router as employee} from "./routes/employee.routes.js"
//import {router as salary} from "./routes/salary.routes.js"
import createConnectionMongoose from './DB/index.js'


dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
createConnectionMongoose()

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// routes
app.use("/api/v1", router);
app.use("/api/v2", employee);
//app.use("/api/v3", salary);


app.listen(PORT, () => console.log(`Server is Running....!`));

export { JWT_SECRET };
