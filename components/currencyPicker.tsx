type CurrencyPickerProps = {
  currencies: string[];
  selectedCurrency: string;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<string>>;
};

function CurrencyPicker({
  currencies,
  selectedCurrency,
  setSelectedCurrency,
}: CurrencyPickerProps) {
  return (
    <div className="flex items-center justify-center gap-4 w-full">
      <div className="font-semibold">Exchange rates tracker</div>

      <select
        className="text-black bg-white rounded-md border border-gray-500 px-2 font-semibold"
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyPicker;
