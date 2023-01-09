import './Footer.css';
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import telegram from '../../telegram.svg';
import viber from '../../viber.svg'



const Footer = () => {

    const { t } = useTranslation();


    return (
        <div>
            <hr/>
            <div className="contacts">
            <p className="contactBlock">{t('contact')}
                <a href="https://t.me/romka_diachenko"
                   target="_blank">
                <img src={telegram}
                     width="45"
                     height="45"
                     alt="Telegram"/></a>
                {/*<a href="https://viber.com/"*/}
                {/*   target="_blank">*/}
                {/*<img src={viber}*/}
                {/*     width="40"*/}
                {/*     height="40"*/}
                {/*     alt="Viber"/></a>*/}
            </p>
            </div>
        </div>
    )
}

export default Footer;