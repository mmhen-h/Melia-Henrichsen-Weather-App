import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 4000;
const API_KEY = "c75c981860a96ab6063e0ae97da59e40"; 

app.use(cors());

app.get("/api/weather", async (req, res) => {
  const { cityA, cityB } = req.query;
  if (!cityA || !cityB) return res.status(400).json({ error: "Missing cities." });

  try {
    const [dataA, dataB] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityA}&units=metric&appid=${API_KEY}`),
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityB}&units=metric&appid=${API_KEY}`)
    ]);

    const weatherA = await dataA.json();
    const weatherB = await dataB.json();

    res.json({
      cityA: { temp: weatherA.main?.temp || "N/A" },
      cityB: { temp: weatherB.main?.temp || "N/A" }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data." });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));