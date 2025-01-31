import CurrencyRow from "./CurrencyRow";
import { useEffect, useState } from "react";
import exchangeImage from "./exchange.svg";

const URL = "https://api.frankfurter.dev/v1/latest";

const App = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRates(data.rates); // Store exchange rates
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleConversion = () => {
    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
      return;
    }

    const rate = exchangeRates[toCurrency];
    if (rate) {
      setConvertedAmount(amount * rate);
    }
  };

  useEffect(() => {
    if (amount && fromCurrency && toCurrency && exchangeRates) {
      handleConversion();
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);
  return (
    <>
      <div className="header">
        <img src={exchangeImage} className="image" alt="Currency Exchange" />
        <h1>Convert Currency</h1>
      </div>

      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => {
          setFromCurrency(e.target.value);
        }}
        amount={amount}
        onAmountChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <div className="equals">🢃</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => {
          setToCurrency(e.target.value);
        }}
        amount={convertedAmount}
        onAmountChange={() => {}} // No need to change amount here
      />
      <div className="result">Exchange Rate: {convertedAmount}</div>
    </>
  );
};

export default App;
