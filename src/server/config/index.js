
import dotenv from 'dotenv'
dotenv.config()

export const config = {
  coinMarketCap: {
    apiKey: process.env.COINMARKETCAP_API_KEY,
    baseUrl: process.env.COINMARKETCAP_URL,
  }
};