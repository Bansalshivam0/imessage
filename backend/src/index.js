import express from "express";
import "dotenv/config";

console.log("DB URL is : ",process.env.DB_URL);
const PORT = process.env.PORT;
const app = express();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

