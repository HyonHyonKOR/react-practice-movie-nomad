import { useEffect, useState } from "react";
import styles from "./App.module.css";

function App() {
  const [coinName, setCoinName] = useState("");
  const [coinPrice, setCoinPrice] = useState(0);
  const [money, setMoney] = useState();
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  const onChange = (event) => {
    setMoney(event.target.value);
  };

  const onSelect = (event) => {
    const arr = event.target.value.split(",");
    const [selectedCoinPrice, selectedCoinName] = arr;
    setCoinPrice(selectedCoinPrice);
    setCoinName(selectedCoinName);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
        setCoinPrice(data[0].quotes.USD.price);
        setCoinName(data[0].name);
      });
  }, []);

  return (
    <div>
      <h1>The Coins!</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <select onChange={onSelect}>
            {coins.map((coin) => (
              <option key={coin.id} value={[coin.quotes.USD.price, coin.name]}>
                {coin.name} ({coin.symbol}) : $
                {coin.quotes.USD.price.toFixed(2)} USD
              </option>
            ))}
          </select>
          <input
            className={styles.input}
            onChange={onChange}
            value={money}
            type="number"
            placeholder="Enter your budget($)"
          />

          <h5>
            You can buy {money ? Math.floor(money / coinPrice) : 0} {coinName}
          </h5>
        </div>
      )}
    </div>
  );
}

export default App;
