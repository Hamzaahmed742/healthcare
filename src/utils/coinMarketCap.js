
export async function getTokenInfo(symbol) {
  try {
    const response = await fetch(`http://localhost:5000/api/token/${symbol}`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return {
      price: data.price,
      percent_change_24h: data.percent_change_24h,
      percent_change_1h: data.percent_change_1h,
      market_cap: data.market_cap,
      volume_24h: data.volume_24h,
      symbol: data.symbol,
      name: data.name,
    };
  } catch (error) {
    return error;
  }
}
