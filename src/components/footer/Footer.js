import './Footer.css';
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import telegram from '../../telegram.svg';
import viber from '../../viber.svg'



const Footer = () => {

    const { t } = useTranslation();

    const handleLanguageChange = (language) => {
        if (language === 'en') {
            i18next.changeLanguage(language);
        } else if (language === 'ua') {
            i18next.changeLanguage(language);
        }
    };

    return (
        <div className="footer">
            <hr/>
            <div className="contacts">
            <p>{t('contact')}
                <a className="telegram"
                    href="https://t.me/romka_diachenko"
                    target="_blank">
                <img src={telegram}
                     width="50"
                     height="50"
                     alt="Telegram"/></a>
                <a className="viber"
                   href="https://viber.com/"
                   target="_blank">
                <img src={viber}
                     width="50"
                     height="50"
                     alt="Viber"/></a></p></div>
            <div className="app-lang-btn">
                 <button className="lang-btn"
                    onClick={() => handleLanguageChange('en')}>
                    {i18next.language === 'en' ? 'Eng' : 'Анг'}
                 </button>
                <button className="lang-btn"
                        onClick={() => handleLanguageChange('ua')}>
                    {i18next.language === 'ua' ? 'Укр' : 'Ua'}
                </button>
</div>
        </div>
    )
}

export default Footer;