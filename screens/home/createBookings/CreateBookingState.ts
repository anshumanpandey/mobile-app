import { createGlobalState } from 'react-hooks-global-state';

export type LocationCode = {
    country: string,
    id: number,
    internalcode: string,
    locationname: string,
    locationvariation: string
}

type InitialState = {
    originLocation: LocationCode | null,
    returnLocation: LocationCode | null,
    inmediatePickup: boolean | null,
    departureTime: Date,
    returnTime: Date,
};
 
const initialState: InitialState = {
    originLocation: null,
    returnLocation: null,
    inmediatePickup: null,
    departureTime: new Date(),
    returnTime: new Date(),
};

export const { useGlobalState: useCreateBookingState } = createGlobalState<InitialState>(initialState);