import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    console.error("Error: OpenAI API Key is missing.");
    process.exit(1);
}

const testOpenAI = async () => {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: "How do I integrate Segment with Google Analytics?" }
                ],
                max_tokens: 100,
                temperature: 0.7,
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("OpenAI API Response:", response.data.choices[0].message.content);
    } catch (error) {
        console.error("OpenAI API Test Error:", {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
        });
    }
};

testOpenAI();
