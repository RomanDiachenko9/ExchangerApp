import './Header.css';
import { useTranslation } from "react-i18next";
import moment from "moment";
import i18next from "i18next";

const localTimeUa = moment().locale('ua').format('DD.MM.YYYY LT');
const localTimeEn = moment().locale('en').format('MM/DD/YYYY LT');


const Header = () => {

    const { t } = useTranslation();
    const handleLanguageChange = (language) => {
        if (language === 'en') {
            i18next.changeLanguage(language);
        } else if (language === 'ua') {
            i18next.changeLanguage(language);
        }
    };

    const localTime = () => {
        if (i18next.language === 'ua') {
            return moment().locale('ua').format('DD.MM.YYYY LT');
        } else if (i18next.language === 'en') {
            return moment().locale('en').format('MM/DD/YYYY LT')
        }
    }


    return (
        <div class="header">
            <div className="lang-btns">
            <button className="lang-btn"
                    onClick={() => handleLanguageChange('en')}>
                {i18next.language === 'en' ? 'Eng' : 'Анг'}
            </button>
            <button className="lang-btn"
                    onClick={() => handleLanguageChange('ua')}>
                {i18next.language === 'ua' ? 'Укр' : 'Ua'}
            </button>
            </div>
            <p className="h2_mt6_mb6">{t('title')}<b>{localTime()}</b>
            </p>
            <h1 className="currencies__header-info">
                {t('description')}
            </h1>
            <hr></hr>
        </div>
    );
}

export default Header;
