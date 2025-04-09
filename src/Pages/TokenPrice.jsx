import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTokenInfo } from '../utils/coinMarketCap';
import styled from 'styled-components';

const TokenContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;

const PriceCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PriceChange = styled.span`
  color: ${props => props.isPositive ? '#16c784' : '#ea3943'};
  font-weight: bold;
`;

const TokenPrice = () => {
  const { symbol } = useParams();
  const [tokenData, setTokenData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokenData = async () => {
      if (!symbol) return;

      try {
        const result = await getTokenInfo(symbol);
        if (result instanceof Error) {
          setError(result.message);
        } else {
          setTokenData(result);
        }
      } catch (err) {
        setError('Failed to fetch token data');
      } finally {
        setLoading(false);
      }
    };

    fetchTokenData();
  }, [symbol]);

  if (loading) {
    return (
      <TokenContainer>
        <div>Loading...</div>
      </TokenContainer>
    );
  }

  if (error) {
    return (
      <TokenContainer>
        <div>Error: {error}</div>
      </TokenContainer>
    );
  }

  if (!tokenData) {
    return (
      <TokenContainer>
        <div>No data found for {symbol}</div>
      </TokenContainer>
    );
  }

  return (
    <TokenContainer>
      <PriceCard>
        <h1>{tokenData.name} ({tokenData.symbol})</h1>
        <h2>Price: ${tokenData.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}</h2>
        <p>
          24h Change:{' '}
          <PriceChange isPositive={tokenData.percent_change_24h >= 0}>
            {tokenData.percent_change_24h.toFixed(2)}%
          </PriceChange>
        </p>
        <p>
          1h Change:{' '}
          <PriceChange isPositive={tokenData.percent_change_1h >= 0}>
            {tokenData.percent_change_1h.toFixed(2)}%
          </PriceChange>
        </p>
        <p>Market Cap: ${tokenData.market_cap.toLocaleString()}</p>
        <p>24h Volume: ${tokenData.volume_24h.toLocaleString()}</p>
      </PriceCard>
    </TokenContainer>
  );
};

export default TokenPrice;