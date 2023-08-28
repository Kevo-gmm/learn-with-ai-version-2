import cors from "cors";
import express from "express";
import whisper from "./routes/whisper";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", whisper);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// curl -i -N -H "Accept: text/event-stream" http://localhost:3000/query-api/query?query=summarize this page&url=http://localhost/wordpress/how-to-make-money-as-developer/?preview=true
