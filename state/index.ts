import { createGlobalState, createStore } from 'react-hooks-global-state';
import AsyncStorage from '@react-native-community/async-storage';

type InitialState = {
    loading: boolean
    token: null | string
    error: null | string
    success: null | string
    profile: null | { [key: string]: any }
}
const initialState: InitialState = {
    loading: false,
    token: null,
    error: null,
    success: null,
    profile: null
};

const normalReducer = (state: any, action: { type: string, state?: any }): InitialState => {
    switch (action.type) {
        case 'error': {
            return { ...state, error: action.state };
        }
        case 'loading': {
            return { ...state, loading: action.state };
        }
        case 'token': {
            AsyncStorage.setItem('token', action.state)
            return { ...state, token: action.state };
        }
        case 'profile': {
            AsyncStorage.setItem('profile', JSON.stringify(action.state))
            return { ...state, profile: action.state };
        }
        case 'logout': {
            AsyncStorage.removeItem('token')
            AsyncStorage.removeItem('profile')
            return { ...state, token: null, profile: null };
        }
        case 'error': {
            return { ...state, error: action.state };
        }
        case 'success': {
            return { ...state, success: action.state };
        }
        default: return state;
    }
}

export const { dispatch: dispatchGlobalState, useGlobalState, getState: getGlobalState } = createStore(normalReducer, initialState)

AsyncStorage.getItem('token')
    .then(token => {
        if (token) {
            dispatchGlobalState({ type: 'token', state: token})
        }
    })

AsyncStorage.getItem('profile')
    .then(profile => {
        if (profile) {
            dispatchGlobalState({ type: 'profile', state: JSON.parse(profile)})
        }
    })