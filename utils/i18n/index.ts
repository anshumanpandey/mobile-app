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
    "SEARCH_WORD" = "SEARCH_WORD",
    "NO_WORD"= "NO_WORD",
    "YES_WORD"= "YES_WORD",
    "CLOSE_WORD"= "CLOSE_WORD",
    "APPLY_WORD"= "APPLY_WORD",
    "CONTINUE_WORD"= "CONTINUE_WORD",
    "TERMS_CONDITIONS_WORD"= "TERMS_CONDITIONS_WORD",
    "RIGHT_CARS_WORD"= "RIGHT_CARS_WORD",
    "PRIVACY_POLICY_WORD"= "PRIVACY_POLICY_WORD",
    "AND_WORD"= "AND_WORD",
    "CANCELLED_WORD"= "CANCELLED_WORD",
    "CONFIRMATION_WORD"="CONFIRMATION_WORD",
    "HELP_WORD"= "HELP_WORD",
    "VERIFY_WORD"= "VERIFY_WORD",
    "WAIT_WORD"= "WAIT_WORD",

    "TRIP_CAR_COST_TAG"= "TRIP_CAR_COST_TAG",

    "DETAILS_DIRECTION_MENU_OPTION"= "DETAILS_DIRECTION_MENU_OPTION",
    "DETAILS_HELP_MENU_OPTION"= "DETAILS_HELP_MENU_OPTION",
    "DETAILS_COLLECT_MENU_OPTION"= "DETAILS_COLLECT_MENU_OPTION",
    "DETAILS_CANCEL_MENU_OPTION"= "DETAILS_CANCEL_MENU_OPTION",
    "DETAILS_PICKUP_LOCATION_TAG"="DETAILS_PICKUP_LOCATION_TAG",
    "DETAILS_DROP_LOCATION_TAG"="DETAILS_DROP_LOCATION_TAG",
    "DETAILS_PICKUP_LOCATION_TIME_TAG"="DETAILS_PICKUP_LOCATION_TIME_TAG",
    "DETAILS_DROP_LOCATION_TIME_TAG"="DETAILS_DROP_LOCATION_TIME_TAG",
    "DETAILS_CAR_BOOKING_TAG"="DETAILS_CAR_BOOKING_TAG",
    "DETAILS_TOTAL_PRICE_TAG"="DETAILS_TOTAL_PRICE_TAG",
    "DETAILS_PAYABLE_COLLECTION_TAG"="DETAILS_PAYABLE_COLLECTION_TAG",
    "DETAILS_PICKUP_INSTRUCTIONS_TAG"="DETAILS_PICKUP_INSTRUCTIONS_TAG",
    "DETAILS_MAP_LOADING_ROUTE_TAG"= "DETAILS_MAP_LOADING_ROUTE_TAG",
    "DETAILS_MAP_FAIL_LOAD_ROUTE_TAG"= "DETAILS_MAP_FAIL_LOAD_ROUTE_TAG",

    "CAR_LIST_ITEM_FUEL_POLICY"= "CAR_LIST_ITEM_FUEL_POLICY",
    "CAR_LIST_ITEM_FUEL_POLICY_LILE_TO_LIKE"= "CAR_LIST_ITEM_FUEL_POLICY_LILE_TO_LIKE",
    "CAR_LIST_ITEM_MILEAGE"= "CAR_LIST_ITEM_MILEAGE",
    "CAR_LIST_ITEM_UNLIMITED"= "CAR_LIST_ITEM_UNLIMITED",

    "MENU_ITEM_PRIVACY_POLICY" = "MENU_ITEM_PRIVACY_POLICY",
    "MENU_ITEM_TERMS_CONDITIONS" = "MENU_ITEM_TERMS_CONDITIONS",
    "MENU_ITEM_LOGOUT"= "MENU_ITEM_LOGOUT",
    "LOGOUT_MESSAGE"= "LOGOUT_MESSAGE",
    "MY_TRIPS_SCREEN_TITLE" = "MY_TRIPS_SCREEN_TITLE",
    "CREATE_BTN_TEXT"= "CREATE_BTN_TEXT",
    "ACTIVE_TAB_TXT"= "ACTIVE_TAB_TXT",
    "NO_ACTIVE_BOOKING_TXT"="NO_ACTIVE_BOOKING_TXT",
    "UPCOMING_TAB_TXT"= "UPCOMING_TAB_TXT",
    "NO_UPCOMING_BOOKING_TXT"= "NO_UPCOMING_BOOKING_TXT",
    "COMPLETED_TAB_TXT"= "COMPLETED_TAB_TXT",
    "NO_COMPLETED_BOOKING_TXT"= "NO_COMPLETED_BOOKING_TXT",

    "NEW_BOOKING_SCREEN_TITLE"= "NEW_BOOKING_SCREEN_TITLE",
    "NEW_BOOKING_IMMEDIATE_PICKUP_TITLE"= "NEW_BOOKING_IMMEDIATE_PICKUP_TITLE",
    "NEW_BOOKING_IMMEDIATE_PICKUP_SUBTITLE"= "NEW_BOOKING_IMMEDIATE_PICKUP_SUBTITLE",
    "NEW_BOOKING_IN_ADVANCE_PICKUP_TITLE"= "NEW_BOOKING_IN_ADVANCE_PICKUP_TITLE",
    "NEW_BOOKING_RETURN_ON_SAME_LOCATION_TAG"= "NEW_BOOKING_RETURN_ON_SAME_LOCATION_TAG",
    "NEW_BOOKING_ENTER_ORIGIN_PLACEHOLDER"= "NEW_BOOKING_ENTER_ORIGIN_PLACEHOLDER",
    "NEW_BOOKING_RETURN_DESTINATION_PLACEHOLDER"= "NEW_BOOKING_RETURN_DESTINATION_PLACEHOLDER",
    "NEW_BOOKING_RETURN_TIME_TAG"= "NEW_BOOKING_RETURN_TIME_TAG",

    "CAR_LIST_SORT_LABEL"= "CAR_LIST_SORT_LABEL",
    "CAR_LIST_FILTER_LABEL"= "CAR_LIST_FILTER_LABEL",
    "CAR_LIST_LOW_TO_HIGH_OPTION"= "CAR_LIST_LOW_TO_HIGH_OPTION",
    "CAR_LIST_HIGH_TO_LOW_OPTION"= "CAR_LIST_HIGH_TO_LOW_OPTION",
    "CAR_LIST_TRANSMISSION_SUBTITLE"= "CAR_LIST_TRANSMISSION_SUBTITLE",
    "CAR_LIST_CAR_TYPE_SUBTITLE"= "CAR_LIST_CAR_TYPE_SUBTITLE",
    "CAR_LIST_BOOOK_NOW_BTN"= "CAR_LIST_BOOOK_NOW_BTN",
    
    "CAR_EXTRAS_TAG"= "CAR_EXTRAS_TAG",

    "PAYMENT_SCREEN_TILE"= "PAYMENT_SCREEN_TILE",
    "PAYMENT_INFO"= "PAYMENT_INFO",
    "PAYMENT_AGREE_AND_UNDERSTAND"= "PAYMENT_AGREE_AND_UNDERSTAND",
    "PAYMENT_BOOOK_NOW_BTN"= "PAYMENT_BOOOK_NOW_BTN",
    'CONFIRMATION_GO_HOME_BTN'= "CONFIRMATION_GO_HOME_BTN",

    "NO_RESULT_TITLE"= "NO_RESULT_TITLE",
    "NO_RESULT_SUB_TITLE"= "NO_RESULT_SUB_TITLE",
    "NO_RESULT_GO_BACK_BTN"= "NO_RESULT_GO_BACK_BTN",
    "NO_RESULT_FETCHING_LOCATION_TAG" = "NO_RESULT_FETCHING_LOCATION_TAG",

    "OPT_SCREEN_TITLE"= "OPT_SCREEN_TITLE",
    "OPT_SCREEN_SUB_TITLE"= "OPT_SCREEN_SUB_TITLE",
    "OPT_DID_NOT_RECEIVE"= "OPT_DID_NOT_RECEIVE",
    "OPT_RESEND" ="OPT_RESEND",
    "OPT_WAIT_SMS"= "OPT_WAIT_SMS",
    "OPT_LATER"= "OPT_LATER",
}