import cors from "cors";
import express from "express";
import whisper from "./routes/whisper";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/", whisper);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


