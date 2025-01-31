import PropTypes from "prop-types";

const CurrencyRow = (props) => {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onAmountChange,
  } = props;

  return (
    <div className="currency-row">
      <input
        type="number"
        className="input"
        value={amount}
        onChange={onAmountChange} // Use the passed down function
      />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

CurrencyRow.propTypes = {
  currencyOptions: PropTypes.array.isRequired,
  selectedCurrency: PropTypes.string.isRequired,
  onChangeCurrency: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired, // Expect amount as a prop
  onAmountChange: PropTypes.func.isRequired, // Expect onAmountChange as a prop
};

export default CurrencyRow;
