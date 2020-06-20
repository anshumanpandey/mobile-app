import { createStore } from 'react-hooks-global-state';
import { DocumentPickerResponse } from 'react-native-document-picker';

export enum  FileTypeEnum {"passport" , "driving_license" , "utility_bill" , "selfi_licence"}
type FileEntity = {
    file?: DocumentPickerResponse
    metadata?: {
        expDate: moment.Moment
        country: string
    }
}
type InitialState = {
    dictionary: Map<FileTypeEnum, FileEntity>,
}
const initialState: InitialState = {
    dictionary: new Map(),
};
 

export const { 
    dispatch: dispatchFileState,
    useGlobalState: useDocumentState,
} = createStore<InitialState, { type: FileTypeEnum, state: FileEntity}>((state, action) => {
    switch (action.type) {
        case FileTypeEnum.passport: {
            state.dictionary.set(action.type, action.state)
            return { dictionary: new Map(state.dictionary) };
        }
        default: return state;
    }
}, initialState)