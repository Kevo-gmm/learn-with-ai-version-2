"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const whisper_1 = __importDefault(require("./routes/whisper"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use("/", whisper_1.default);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
// curl -i -N -H "Accept: text/event-stream" http://localhost:3000/query-api/query?query=summarize this page&url=http://localhost/wordpress/how-to-make-money-as-developer/?preview=true
