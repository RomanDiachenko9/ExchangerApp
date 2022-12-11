import './App.css';
import {useState, useEffect} from "react";
import CurrencyInput from "../currencyInput/CurrencyInput";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import axios from "axios";
import {useTranslation} from "react-i18next";



function App() {

    const { t } = useTranslation();

    const [inCcyValue, setInCcyValue] = useState();
    const [outCcyValue, setOutCcyValue] = useState();
    const [selectedInValue, setSelectedInValue] = useState('EUR');
    const [selectedOutValue, setSelectedOutValue] = useState('UAH');
    const [inRates, setInRates] = useState([]);
    const [outRates, setOutRates] = useState([]);
    const [currencyData, setCurrencyData] = useState([]);
    const [reversedValue, setReversedValue] = useState(false);


    useEffect(() => {
        axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5')
            .then(response => {
                const currenciesInArr = [];
                const currenciesOutArr = [];

                for (const data of response.data) {
                    currenciesInArr.push(data.ccy);
                    currenciesInArr.push(data.base_ccy);
                    currenciesOutArr.push(data.base_ccy);
                }

                const uniqueInValues = Array.from(new Set(currenciesInArr)).filter(Boolean);
                const uniqueOutValues = Array.from(new Set(currenciesOutArr)).filter(Boolean);
                setInRates(uniqueInValues);
                setOutRates(uniqueOutValues);
                setCurrencyData(response.data);
            });
    }, []);



    const calculate = (value, direct) => {
        if (direct === 'in') {
            const ccyData = currencyData.filter(el => !reversedValue ?  el.ccy === selectedInValue : el.ccy === selectedOutValue);
            const valueToSet = !reversedValue ? (value * ccyData[0].buy).toFixed(2) : (value / ccyData[0].sale).toFixed(2);
            setInCcyValue(value);
            setOutCcyValue(valueToSet);
        } else if  (direct === 'out') {
            const ccyData = currencyData.filter(el => !reversedValue ?  el.ccy === selectedInValue : el.ccy === selectedOutValue);
            const valueToSet = reversedValue ? (value * ccyData[0].sale).toFixed(2) : (value / ccyData[0].buy).toFixed(2);
            setInCcyValue(valueToSet);
            setOutCcyValue(value);
        }
    }

    useEffect(() => {
        if (outCcyValue) {
            calculate(inCcyValue, 'in');
        }
    }, [reversedValue]);

    const reverseVal = (newInRate) => {
        setReversedValue(!reversedValue);
        setCurrencyData(currencyData);
        if (!newInRate) {
            setOutCcyValue(inCcyValue)
        }
        newInRate ? setOutRates(newInRate) : setOutRates(inRates);
        setInRates(outRates);
        setSelectedOutValue(selectedInValue);
        setSelectedInValue(selectedOutValue);
    }

    useEffect(() => {
    }, [selectedOutValue]);

    const removeUAH = (value, direct) => {
        if (value === 'USD' || value === 'EUR') {
            if (direct === 'in') {
                const newInRates = inRates.filter(el => el !== 'UAH');
                setInRates(newInRates);
            } else if ('out') {
                const newOutRates = outRates.filter(el => el !== 'UAH');
                setOutRates(newOutRates);
            }
        } else if (value === 'UAH') {
            const newInRates = inRates.filter(el => el !== 'UAH');
            reverseVal(newInRates)
        }
        if (direct === 'in'){
            setSelectedInValue(value);
        } else {
            setSelectedOutValue(value)
        }
    }

    return (
        <div>
            <Header/>
            <h1>{t('enter')}</h1>
            <CurrencyInput
                text={t('give')}
                selectedValue={selectedInValue}
                onCcySelect={value => {
                    removeUAH(value, 'in');
                }}
                currencies={inRates}
                inputValue={inCcyValue}
                onValueChange={(value) => calculate(value, 'in')}
            />
            <button
                className="btn"
                onClick={() => reverseVal()}
            >
                &#11015;&#11014;
            </button>
            <CurrencyInput
                text={t('get')}
                inputValue={outCcyValue}
                onCcySelect={(value) => {
                    removeUAH(value, 'out');
                }}
                selectedValue={selectedOutValue}
                currencies={outRates}
                onValueChange={(value) => calculate(value, 'out')}
            />
            <Footer/>
        </div>
    );
}

export default App;