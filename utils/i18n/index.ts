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
    "MY_TRIPS_SCREEN_TITLE" = "MY_TRIPS_SCREEN_TITLE",
    "CREATE_BTN_TEXT"= "CREATE_BTN_TEXT",
    "ACTIVE_TAB_TXT"= "ACTIVE_TAB_TXT",
    "NO_ACTIVE_BOOKING_TXT"="NO_ACTIVE_BOOKING_TXT",
    "UPCOMING_TAB_TXT"= "UPCOMING_TAB_TXT",
    "NO_UPCOMING_BOOKING_TXT"= "NO_UPCOMING_BOOKING_TXT",
    "COMPLETED_TAB_TXT"= "COMPLETED_TAB_TXT",
    "NO_COMPLETED_BOOKING_TXT"= "NO_COMPLETED_BOOKING_TXT",
}