require("dotenv").config();
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const express = require("express");
const cors = require("cors");
const { GoogleGenAI, Type } = require("@google/genai");
const connectDatabase = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const exportRoutes = require("./routes/exportRoutes");

const app = express();
const port = Number(process.env.PORT) || 5000;

const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok", service: "chicos-colors-api" });
});

app.post("/api/generate-palette", async (request, response) => {
  const prompt = typeof request.body?.prompt === "string" ? request.body.prompt.trim() : "";
  if (!prompt) return response.status(400).json({ message: "A palette prompt is required." });
  if (!process.env.GEMINI_API_KEY) return response.status(500).json({ message: "Gemini API is not configured on the server." });

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a curated color palette for this request: ${prompt}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            paletteName: { type: Type.STRING },
            colors: {
              type: Type.ARRAY,
              minItems: 5,
              maxItems: 5,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  hex: { type: Type.STRING, description: "A six-digit CSS HEX color such as #1A2B3C." }
                },
                required: ["name", "hex"]
              }
            }
          },
          required: ["paletteName", "colors"]
        }
      }
    });

    const palette = JSON.parse(result.text);
    if (!palette.paletteName || !Array.isArray(palette.colors) || palette.colors.length !== 5 || palette.colors.some((color) => !color.name || !/^#[0-9A-F]{6}$/i.test(color.hex))) {
      return response.status(500).json({ message: "Gemini returned an invalid five-color palette." });
    }
    response.json({ paletteName: palette.paletteName, colors: palette.colors.map((color) => ({ name: color.name, hex: color.hex.toUpperCase() })) });
  } catch (error) {
    console.error("Gemini palette generation failed:", error.message);
    response.status(500).json({ message: "Unable to generate a palette right now. Please try again." });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/export", exportRoutes);

app.use((request, response) => {
  response.status(404).json({ message: `Route not found: ${request.method} ${request.originalUrl}` });
});

app.use((error, _request, response, _next) => {
  console.error(error);
  if (error.name === "ValidationError") {
    return response.status(400).json({ message: "Request validation failed.", details: Object.values(error.errors).map((item) => item.message) });
  }
  if (error.code === 11000) {
    return response.status(409).json({ message: "A record with that value already exists." });
  }
  response.status(500).json({ message: "Internal server error." });
});

async function startServer() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error("Set a JWT_SECRET with at least 32 characters in backend/.env before starting the API.");
  }

  await connectDatabase();
  app.listen(port, () => console.log(`Chico's Colors API is running at http://localhost:${port}`));
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error("Unable to start API:", error.message);
    process.exitCode = 1;
  });
}

module.exports = app;
