import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import https from "https";

dotenv.config();

const app = express();
const PORT = 3000;

// OpenAI API Key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
    console.error("Error: OpenAI API Key is missing.");
    process.exit(1);
}

// Custom HTTPS agent to bypass SSL validation
const httpsAgent = new https.Agent({
    rejectUnauthorized: false, // Disable SSL certificate validation (for development)
});

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(path.resolve(), "public")));

// CDP Documentation Files
const cdpDocs = [
    { name: "Segment", filePath: "./data/segment-docs.txt" },
    { name: "mParticle", filePath: "./data/mparticle-docs.txt" },
    { name: "Lytics", filePath: "./data/lytics-docs.txt" },
    { name: "Zeotap", filePath: "./data/zeotap-docs.txt" },
];

const combinedDocs = cdpDocs
    .map((cdp) => {
        if (fs.existsSync(cdp.filePath)) {
            return fs.readFileSync(cdp.filePath, "utf8").slice(0, 1000);
        }
        return "";
    })
    .join("\n\n");

// Route to handle user queries
app.post("/ask", async (req, res) => {
    const question = req.body.question?.trim();
    if (!question) {
        return res.json({ answer: "Please ask a valid question." });
    }

    try {
        const truncatedDocs = combinedDocs.slice(0, 3000); // Token limit
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a helpful assistant with expertise in Customer Data Platforms (CDPs)." },
                    { role: "user", content: `Here are the CDP documentation details:\n\n${truncatedDocs}\n\nQuestion: ${question}` },
                ],
                max_tokens: 1000,
                temperature: 0.7,
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
                httpsAgent, // Custom HTTPS agent
                timeout: 10000, // 10 seconds
            }
        );

        res.json({ answer: response.data.choices[0].message.content.trim() });
    } catch (error) {
        console.error("OpenAI API Error:", error.message);
        let message = "Sorry, there was an error processing your request.";
        if (error.message.includes("self-signed certificate")) {
            message = "SSL error: Unable to verify server's certificate. Please contact your administrator.";
        }
        res.json({ answer: message });
    }
});

// Serve the home page
app.get("/", (req, res) => {
    res.sendFile(path.join(path.resolve(), "public/index.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Chatbot server running on http://localhost:${PORT}`);
});
