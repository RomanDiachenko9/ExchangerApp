import './CurrencyInput.css';

const CurrencyInput = ({ currencies, onValueChange, onCcySelect, inputValue, selectedValue, text }) => {

    return (
        <div className="group">
            <input
                placeholder={text}
                type="number"
                onChange={(e) => onValueChange(e.target.value)}
                value={inputValue}
            />
            <select
                className="selectList"
                value={selectedValue}
                onChange={(e) => {
                    onCcySelect(e.target.value)
                }}
            >
                {currencies.map(((currencyName, i) => {
                    return (
                        <option
                            className="selectList"
                            value={currencyName}
                            key={i}>
                            {currencyName}
                        </option>
                    )
                }))}
            </select>
        </div>
    );
}

export default CurrencyInput;