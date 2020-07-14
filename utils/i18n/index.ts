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
    "COMPLETE_WORD"= "COMPLETE_WORD",
    "OK_WORD"= "OK_WORD",
    "NEXT_WORD"= "NEXT_WORD",
    "SAVE_NEXT_WORD"= "SAVE_NEXT_WORD",
    "REQUIRED_WORD"= "REQUIRED_WORD",
    "FORMAT_WORD"= "FORMAT_WORD",
    "LOGIN_WORD"= "LOGIN_WORD",
    "MOBILE_NUMBER_WORD"= "MOBILE_NUMBER_WORD",
    "EDIT_WORD" = "EDIT_WORD",
    "CAMERA_WORD" = "CAMERA_WORD",
    "GALLERY_WORD" = "GALLERY_WORD",

    "ONLY_NUMBERS_ERRORS"= "ONLY_NUMBERS_ERRORS",

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
    "CONFIRM_WORD" ="CONFIRM_WORD",

    "SIGN_SIGNED_BY" = "SIGN_SIGNED_BY",
    "COLLECT_INSTRUCTION" = "COLLECT_INSTRUCTION",

    "SIGN_OUR_AGREEMEN"= "SIGN_OUR_AGREEMEN",
    "SIGN_MESSAGE"= "SIGN_MESSAGE",
    "SIGN_AGREEMENT_BTN"= "SIGN_AGREEMENT_BTN",

    "PROFILE_VERIFICATION_PROFILE_STEP"= "PROFILE_VERIFICATION_PROFILE_STEP",
    "PROFILE_VERIFICATION_PASSPORT_STEP"= "PROFILE_VERIFICATION_PASSPORT_STEP",
    "PROFILE_VERIFICATION_DRIVING_LICENSE_STEP"= "PROFILE_VERIFICATION_DRIVING_LICENSE_STEP",
    "PROFILE_VERIFICATION_PROFILE_PICTURE_STEP"= "PROFILE_VERIFICATION_PROFILE_PICTURE_STEP",
    "PROFILE_VERIFICATION_COMPLETE_STEP"= "PROFILE_VERIFICATION_COMPLETE_STEP",
    "PROFILE_VERIFICATION_SELECT_PICTURE"= "PROFILE_VERIFICATION_SELECT_PICTURE",
    "PROFILE_VERIFICATION_ENABLE_2_FACTOR" = "PROFILE_VERIFICATION_ENABLE_2_FACTOR",
    "PROFILE_VERIFICATION_EMAIL_TAG"= "PROFILE_VERIFICATION_EMAIL_TAG",
    "PROFILE_VERIFICATION_EMAIL_PLACEHOLDER"= "PROFILE_VERIFICATION_EMAIL_PLACEHOLDER",
    "PROFILE_VERIFICATION_PHONE_NUMBER_TAG"= "PROFILE_VERIFICATION_PHONE_NUMBER_TAG",
    "PROFILE_VERIFICATION_COUNTRY_TAG"= "PROFILE_VERIFICATION_COUNTRY_TAG",
    "PROFILE_VERIFICATION_FIRST_NAME_TAG"= "PROFILE_VERIFICATION_FIRST_NAME_TAG",
    "PROFILE_VERIFICATION_FIRST_NAME_PLACEHOLDER"= "PROFILE_VERIFICATION_FIRST_NAME_PLACEHOLDER",
    "PROFILE_VERIFICATION_LAST_NAME_TAG"= "PROFILE_VERIFICATION_LAST_NAME_TAG",
    "PROFILE_VERIFICATION_LAST_NAME_PLACEHOLDER"= "PROFILE_VERIFICATION_LAST_NAME_PLACEHOLDER",
    "PROFILE_VERIFICATION_ADDRESS_1_TAG"= "PROFILE_VERIFICATION_ADDRESS_1_TAG",
    "PROFILE_VERIFICATION_ADDRESS_1_PLACEHOLDER"= "PROFILE_VERIFICATION_ADDRESS_1_PLACEHOLDER",
    "PROFILE_VERIFICATION_ADDRESS_2_TAG"= "PROFILE_VERIFICATION_ADDRESS_2_TAG",
    "PROFILE_VERIFICATION_ADDRESS_2_PLACEHOLDER"= "PROFILE_VERIFICATION_ADDRESS_2_PLACEHOLDER",
    "PROFILE_VERIFICATION_CITY_TAG"= "PROFILE_VERIFICATION_CITY_TAG",
    "PROFILE_VERIFICATION_CITY_PLACEHOLDER"= "PROFILE_VERIFICATION_CITY_PLACEHOLDER",
    "PROFILE_VERIFICATION_POSTCODE_TAG"= "PROFILE_VERIFICATION_POSTCODE_TAG",
    "PROFILE_VERIFICATION_POSTCODE_PLACEHOLDER"= "PROFILE_VERIFICATION_POSTCODE_PLACEHOLDER",
    "PROFILE_VERIFICATION_EXPIRE_DATE_TAG"="PROFILE_VERIFICATION_EXPIRE_DATE_TAG",
    "PROFILE_VERIFICATION_EXPIRE_DATE_PLACEHOLDER"="PROFILE_VERIFICATION_EXPIRE_DATE_PLACEHOLDER",
    "PROFILE_VERIFICATION_DOCUMENT_NUMBER_TAG"="PROFILE_VERIFICATION_DOCUMENT_NUMBER_TAG",
    "PROFILE_VERIFICATION_DOCUMENT_NUMBER_PLACEHOLDER"="PROFILE_VERIFICATION_DOCUMENT_NUMBER_PLACEHOLDER",
    "PROFILE_VERIFICATION_FILE_COUNTRY_TAG"="PROFILE_VERIFICATION_FILE_COUNTRY_TAG",
    "PROFILE_VERIFICATION_FILE_COUNTRY_PLACEHOLDER"="PROFILE_VERIFICATION_FILE_COUNTRY_PLACEHOLDER",
    "PROFILE_VERIFICATION_COMPANY_TAG"= "PROFILE_VERIFICATION_COMPANY_TAG",
    "PROFILE_VERIFICATION_COMPANY_NAME_TAG"= "PROFILE_VERIFICATION_COMPANY_NAME_TAG",
    "PROFILE_VERIFICATION_COMPANY_NAME_PLACEHOLDER"= "PROFILE_VERIFICATION_COMPANY_NAME_PLACEHOLDER",
    "PROFILE_VERIFICATION_COMPANY_VAT_TAG"= "PROFILE_VERIFICATION_COMPANY_VAT_TAG",
    "PROFILE_VERIFICATION_COMPANY_VAT_PLACEHOLDER"= "PROFILE_VERIFICATION_COMPANY_VAT_PLACEHOLDER",
    "PROFILE_VERIFICATION_SUCCESS_MESSAGE"= "PROFILE_VERIFICATION_SUCCESS_MESSAGE",
    "PROFILE_VERIFICATION_ASK_FILE"= "PROFILE_VERIFICATION_ASK_FILE",
    "PROFILE_VERIFICATION_USE_CAMERA"= "PROFILE_VERIFICATION_USE_CAMERA",
    "PROFILE_VERIFICATION_USE_GALLERY"= "PROFILE_VERIFICATION_USE_GALLERY",

    "EDIT_PROFILE_SCREEN_TITLE"= "EDIT_PROFILE_SCREEN_TITLE",
    "EDIT_PROFILE_PROFILE_TAB"= "EDIT_PROFILE_PROFILE_TAB",
    "EDIT_PROFILE_DOCUMENT_TAB"= "EDIT_PROFILE_DOCUMENT_TAB",
    "EDIT_PROFILE_EMAIL_TAG"="EDIT_PROFILE_EMAIL_TAG",
    "EDIT_PROFILE_EMAIL_PLACEHOLDER"="EDIT_PROFILE_EMAIL_PLACEHOLDER",
    "EDIT_PROFILE_PHONE_NUMBER_TAG"= "EDIT_PROFILE_PHONE_NUMBER_TAG",
    "EDIT_PROFILE_ENABLE_2_FACTOR"= "EDIT_PROFILE_ENABLE_2_FACTOR",
    "EDIT_PROFILE_COUNTRY_TAG"= "EDIT_PROFILE_COUNTRY_TAG",
    "EDIT_PROFILE_FIRST_NAME_TAG"="EDIT_PROFILE_FIRST_NAME_TAG",
    "EDIT_PROFILE_FIRST_NAME_PLACEHOLDER"="EDIT_PROFILE_FIRST_NAME_PLACEHOLDER",
    "EDIT_PROFILE_LAST_NAME_TAG"="EDIT_PROFILE_LAST_NAME_TAG",
    "EDIT_PROFILE_LAST_NAME_PLACEHOLDER"="EDIT_PROFILE_LAST_NAME_PLACEHOLDER",
    "EDIT_PROFILE_ADDRESS_1_TAG"="EDIT_PROFILE_ADDRESS_1_TAG",
    "EDIT_PROFILE_ADDRESS_1_PLACEHOLDER"="EDIT_PROFILE_ADDRESS_1_PLACEHOLDER",
    "EDIT_PROFILE_ADDRESS_2_TAG"="EDIT_PROFILE_ADDRESS_2_TAG",
    "EDIT_PROFILE_ADDRESS_2_PLACEHOLDER"="EDIT_PROFILE_ADDRESS_2_PLACEHOLDER",
    "EDIT_PROFILE_CITY_TAG"="EDIT_PROFILE_CITY_TAG",
    "EDIT_PROFILE_CITY_PLACEHOLDER"="EDIT_PROFILE_CITY_PLACEHOLDER",
    "EDIT_PROFILE_POSTCODE_TAG"="EDIT_PROFILE_POSTCODE_TAG",
    "EDIT_PROFILE_POSTCODE_PLACEHOLDER"="EDIT_PROFILE_POSTCODE_PLACEHOLDER",
    "EDIT_PROFILE_COMPANY_TAG"="EDIT_PROFILE_COMPANY_TAG",
    "EDIT_PROFILE_COMPANY_NAME_TAG"="EDIT_PROFILE_COMPANY_NAME_TAG",
    "EDIT_PROFILE_COMPANY_NAME_PLACEHOLDER"="EDIT_PROFILE_COMPANY_NAME_PLACEHOLDER",
    "EDIT_PROFILE_COMPANY_VAT_TAG"="EDIT_PROFILE_COMPANY_VAT_TAG",
    "EDIT_PROFILE_COMPANY_VAT_PLACEHOLDER"="EDIT_PROFILE_COMPANY_VAT_PLACEHOLDER",
    "EDIT_PROFILE_PASSPORT_TAG"="EDIT_PROFILE_PASSPORT_TAG",
    "EDIT_PROFILE_SELFI_TAG"="EDIT_PROFILE_SELFI_TAG",
    "EDIT_PROFILE_DRIVER_LICENSE_TAG"="EDIT_PROFILE_DRIVER_LICENSE_TAG",

    "LOGIN_SCREEN_TITLE"= "LOGIN_SCREEN_TITLE",
    "LOGIN_FORGOT_PASSWORD_TAG"= "LOGIN_FORGOT_PASSWORD_TAG",
    "LOGIN_OR_SOCIAL_LOGIN"= "LOGIN_OR_SOCIAL_LOGIN",
    "LOGIN_DONT_HAVE_ACCOUNT"= "LOGIN_DONT_HAVE_ACCOUNT",
    "LOGIN_SIGN_UP"= "LOGIN_SIGN_UP",
    "LOGIN_SIGN_IN"= "LOGIN_SIGN_IN",
    "LOGIN_EMAIL_TAG"= "LOGIN_EMAIL_TAG",
    "LOGIN_EMAIL_PLACEHOLDER"= "LOGIN_EMAIL_PLACEHOLDER",
    "LOGIN_PASSWORD_TAG"= "LOGIN_PASSWORD_TAG",
    "LOGIN_PASSWORD_PLACEHOLDER"= "LOGIN_PASSWORD_PLACEHOLDER",

    "REGISTER_SCREEN_TITLE"= "REGISTER_SCREEN_TITLE",
    "REGISTER_HAVE_ACCOUNT"= "REGISTER_HAVE_ACCOUNT",
    "REGISTER_LOG_IN"= "REGISTER_LOG_IN",
    "REGISTER_LOGIN_TAG"= "REGISTER_LOGIN_TAG",
    "REGISTER_LOGIN_PLACEHOLDER"= "REGISTER_LOGIN_PLACEHOLDER",
    "REGISTER_PASSWORD_TAG"= "REGISTER_PASSWORD_TAG",
    "REGISTER_PASSWORD_PLACEHOLDER"= "REGISTER_PASSWORD_PLACEHOLDER",
    "REGISTER_PHONE_NUMBER_TAG"= "REGISTER_PHONE_NUMBER_TAG",
    "REGISTER_AS_COMPANY"= "REGISTER_AS_COMPANY",
    "REGISTER_COMPANY_NAME_TAG"= "REGISTER_COMPANY_NAME_TAG",
    "REGISTER_COMPANY_NAME_PLACEHOLDER"= "REGISTER_COMPANY_NAME_PLACEHOLDER",
    "REGISTER_COMPANY_VAT_TAG"= "REGISTER_COMPANY_VAT_TAG",
    "REGISTER_COMPANY_VAT_PLACEHOLDER"= "REGISTER_COMPANY_VAT_PLACEHOLDER",
    "REGISTER_SIGN_UP"= "REGISTER_SIGN_UP",
    "REGISTER_OR_SOCIAL"= "REGISTER_OR_SOCIAL",
    "REGISTER_BY_CLICK_YOU_ACCEPT"= "REGISTER_BY_CLICK_YOU_ACCEPT",
    "REGISTER_TERM_COND"= "REGISTER_TERM_COND",
    "REGISTER_AS_WELL"= "REGISTER_AS_WELL",
    "REGISTER_PRIVACY"= "REGISTER_PRIVACY",

    "FORGOT_SCREEN_TITLE"= "FORGOT_SCREEN_TITLE",
    "FORGOT_SCREEN_SUB_TITLE"= "FORGOT_SCREEN_SUB_TITLE",
    "FORGOT_EMAIL_TAG"= "FORGOT_EMAIL_TAG",
    "FORGOT_EMAIL_PLACEHOLDER"= "FORGOT_EMAIL_PLACEHOLDER",
    "FORGOT_SEND"= "FORGOT_SEND",
    "FORGOT_BACK_TO_SIGN"= "FORGOT_BACK_TO_SIGN",

    "SUCCESS_FORGOT_SCREEN_TITLE"= "SUCCESS_FORGOT_SCREEN_TITLE",
    "SUCCESS_FORGOT_SCREEN_SUB_TITLE"= "SUCCESS_FORGOT_SCREEN_SUB_TITLE",

    "SUCCESS_VERIFY_PHONE_MSG"= "SUCCESS_VERIFY_PHONE_MSG",
    "SUCCESS_VERIFY_PHONE_INFO"= "SUCCESS_VERIFY_PHONE_INFO",

    "VERIFY_EMAIL_SCREEN_TITLE"= "VERIFY_EMAIL_SCREEN_TITLE",
    "VERIFY_EMAIL_SCREEN_SUB_TITLE"= "VERIFY_EMAIL_SCREEN_SUB_TITLE",
    "VERIFY_EMAIL_DID_NOT_RECEIVE"= "VERIFY_EMAIL_DID_NOT_RECEIVE",
    "VERIFY_EMAIL_RESEND"= "VERIFY_EMAIL_RESEND",

    "TERMS_AND_CONDITIONS_SCREEN_TITLE"= "TERMS_AND_CONDITIONS_SCREEN_TITLE",
    "TERMS_AND_CONDITIONS_1"= "TERMS_AND_CONDITIONS_1",
    "TERMS_AND_CONDITIONS_1_1"= "TERMS_AND_CONDITIONS_1_1",
    "TERMS_AND_CONDITIONS_1_2"= "TERMS_AND_CONDITIONS_1_2",
    "TERMS_AND_CONDITIONS_1_3"= "TERMS_AND_CONDITIONS_1_3",
    "TERMS_AND_CONDITIONS_2"= "TERMS_AND_CONDITIONS_2",
    "TERMS_AND_CONDITIONS_2_1"= "TERMS_AND_CONDITIONS_2_1",
    "TERMS_AND_CONDITIONS_2_2"= "TERMS_AND_CONDITIONS_2_2",
    "TERMS_AND_CONDITIONS_2_3"= "TERMS_AND_CONDITIONS_2_3",
    "TERMS_AND_CONDITIONS_2_4"= "TERMS_AND_CONDITIONS_2_4",
    "TERMS_AND_CONDITIONS_2_5"= "TERMS_AND_CONDITIONS_2_5",
    "TERMS_AND_CONDITIONS_2_6"= "TERMS_AND_CONDITIONS_2_6",
    "TERMS_AND_CONDITIONS_2_7"= "TERMS_AND_CONDITIONS_2_7",
    "TERMS_AND_CONDITIONS_3"= "TERMS_AND_CONDITIONS_3",
    "TERMS_AND_CONDITIONS_3_1"= "TERMS_AND_CONDITIONS_3_1",
    "TERMS_AND_CONDITIONS_3_2"= "TERMS_AND_CONDITIONS_3_2",
    "TERMS_AND_CONDITIONS_4"= "TERMS_AND_CONDITIONS_4",
    "TERMS_AND_CONDITIONS_4_1"= "TERMS_AND_CONDITIONS_4_1",
    "TERMS_AND_CONDITIONS_4_2"= "TERMS_AND_CONDITIONS_4_2",
    "TERMS_AND_CONDITIONS_4_3"= "TERMS_AND_CONDITIONS_4_3",
    "TERMS_AND_CONDITIONS_4_4"= "TERMS_AND_CONDITIONS_4_4",
    "TERMS_AND_CONDITIONS_GO_BACK"= "TERMS_AND_CONDITIONS_GO_BACK",
}