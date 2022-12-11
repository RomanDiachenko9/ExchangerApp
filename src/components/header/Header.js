import './Header.css';
import { useTranslation } from "react-i18next";
import moment from "moment";
import logo from "../../whsmnkds.jpg"

const localTime = (moment().locale('ua').format('DD/MM/YYYY LT'));

const Header = () => {

    const { t } = useTranslation();

    return (
        <div

            type="text">
            <p className="h2_mt6_mb6">{t('title')}<b>{localTime}</b>
            </p>
            <h1 className="currencies__header-info">
                {t('description')}
            </h1>
            <hr></hr>
        </div>
    );
}

export default Header;
