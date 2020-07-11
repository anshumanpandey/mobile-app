import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json"

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en: {
        translation: en
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;

export enum TRANSLATIONS_KEY {
    "MENU_ITEM_PRIVACY_POLICY" = "MENU_ITEM_PRIVACY_POLICY",
    "MENU_ITEM_TERMS_CONDITIONS" = "MENU_ITEM_TERMS_CONDITIONS",
    "MENU_ITEM_LOGOUT"= "MENU_ITEM_LOGOUT",
    "LOGOUT_MESSAGE"= "LOGOUT_MESSAGE",
    "NO_WORD"= "NO_WORD",
    "YES_WORD"= "YES_WORD",
}