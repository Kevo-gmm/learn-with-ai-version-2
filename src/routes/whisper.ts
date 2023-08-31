import express from "express";
import path from "path";
import fs from "fs";
import os from "os";
import { Configuration, OpenAIApi } from "openai";

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const router = express.Router();
router.post("/whisper", async (req: any, res: any) => {
  try {
    const { audio } = req.body;
    if (!audio) {
      return res.status(400).json({ error: "No audio file provided. Please provide an audio file to continue" });
    }

    const audioBuffer = Buffer.from(audio, "base64");
    const tempFilePath = path.join(os.tmpdir(), `temp_audio_${Date.now()}.webm`); // Create temp file path
    fs.writeFileSync(tempFilePath, audioBuffer); // Write buffer to temp file

    const text = await convertAudioToText(tempFilePath);
    res.status(200).json({ result: text });
  } catch (error) {
    console.error("An error occurred during the request:", error);
    res.status(500).json({ error: "An error occurred during your request." });
  }
});

async function convertAudioToText(audioPath: string) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    //@ts-ignore
    const response = await openai.createTranscription(fs.createReadStream(audioPath), "whisper-1");
    const transcribedText = response.data.text;
    return transcribedText;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw error;
  }
}
export default router;
