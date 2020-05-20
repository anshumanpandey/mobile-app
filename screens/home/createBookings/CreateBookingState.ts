import { createGlobalState } from 'react-hooks-global-state';

type InitialState = {
    originLocation: string | null,
    returnLocation: string | null,
    inmediatePickup: boolean | null,
    departureTime: Date | null,
    returnTime: Date | null,
};
 
const initialState: InitialState = {
    originLocation: null,
    returnLocation: null,
    inmediatePickup: null,
    departureTime: null,
    returnTime: null,
};

export const { useGlobalState: useCreateBookingState } = createGlobalState<InitialState>(initialState);