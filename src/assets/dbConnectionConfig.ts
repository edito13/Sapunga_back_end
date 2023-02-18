import dotenv from "dotenv";

// Starting Dotenv config to get my credencials
dotenv.config();

const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;

const URL =
  process.env.NODE_ENV === "production"
    ? `mongodb+srv://${db_user}:${db_password}@sapunga.wrmnh69.mongodb.net/sapunga?retryWrites=true&w=majority`
    : "mongodb://localhost/sapunga";

export default URL;
