"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const openai_1 = require("openai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env.local" });
const router = express_1.default.Router();
router.post("/whisper", async (req, res) => {
    try {
        const { audio } = req.body;
        if (!audio) {
            return res.status(400).json({ error: "No audio file provided. Please provide an audio file to continue" });
        }
        const audioBuffer = Buffer.from(audio, "base64");
        const tempFilePath = path_1.default.join(os_1.default.tmpdir(), `temp_audio_${Date.now()}.webm`); // Create temp file path
        fs_1.default.writeFileSync(tempFilePath, audioBuffer); // Write buffer to temp file
        const text = await convertAudioToText(tempFilePath);
        res.status(200).json({ result: text });
    }
    catch (error) {
        console.error("An error occurred during the request:", error);
        res.status(500).json({ error: "An error occurred during your request." });
    }
});
async function convertAudioToText(audioPath) {
    try {
        const configuration = new openai_1.Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new openai_1.OpenAIApi(configuration);
        //@ts-ignore
        const response = await openai.createTranscription(fs_1.default.createReadStream(audioPath), "whisper-1");
        const transcribedText = response.data.text;
        return transcribedText;
    }
    catch (error) {
        console.error("OpenAI API error:", error);
        throw error;
    }
}
exports.default = router;
