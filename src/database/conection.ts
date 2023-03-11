import mongoose from "mongoose";
import URL from "../assets/dbConnectionConfig";

const ConnectToDatabase = async () => {
  try {
    await mongoose.connect(URL);
    return console.log("Conectado com sucesso!!");
  } catch (error) {
    return console.log("Ocorreu um erro: " + error);
  }
};

export default ConnectToDatabase;
