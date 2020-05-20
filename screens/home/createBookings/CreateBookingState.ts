import { createGlobalState } from 'react-hooks-global-state';
 
const initialState = {
    originLocation: null,
    returnLocation: null,
};

export const { useGlobalState: useCreateBookingState } = createGlobalState(initialState);