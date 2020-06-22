import { FileTypeEnum } from "../screens/home/DocumentUpload/DocumentState"

export type NonLoginScreenProps = {
    Login: undefined,
    Signup: undefined,
    Opt: undefined,
    ForgotPassword: undefined,
    TwitterLogin:undefined,
}

export type LoginScreenProps = {
    Home: undefined,
    Bookings: undefined,
    Notifications: undefined,
    Profile: undefined,
    Documents: undefined,    
    DocumentMetadata: undefined,
    SingleUpload: {
        fileType: FileTypeEnum,
    }
    CompletedUpload: undefined
}

export type GrcgdsLocation = {
    "id": number,
    "internalcode": string,
    "locationname": string,
    "locationvariation": string,
    "country": string
}