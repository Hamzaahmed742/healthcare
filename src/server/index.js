import express from "express";
import cors from "cors";
import axios from "axios";
import { config } from "./config/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/token/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const params = new URLSearchParams({
      symbol: symbol.toUpperCase(),
    });

    const url = `${
      config.coinMarketCap.baseUrl
    }/cryptocurrency/quotes/latest?${params.toString()}`;

    const response = await axios.get(url, {
      headers: {
        "X-CMC_PRO_API_KEY": config.coinMarketCap.apiKey,
      },
    });

    const data = response.data;

    if (data.status.error_code) {
      throw new Error(data.status.error_message);
    }

    const [tokenData] = data.data[symbol.toUpperCase()];
    console.log(tokenData);
    if (!tokenData) {
      return res
        .status(404)
        .json({ error: `No data found for symbol ${symbol}` });
    }

    res.json({
      price: tokenData.quote.USD.price,
      percent_change_24h: tokenData.quote.USD.percent_change_24h,
      percent_change_1h: tokenData.quote.USD.percent_change_1h,
      market_cap: tokenData.quote.USD.market_cap,
      volume_24h: tokenData.quote.USD.volume_24h,
      symbol: tokenData.symbol,
      name: tokenData.name,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: error.response?.data?.message || error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
