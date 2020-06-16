import { createGlobalState } from 'react-hooks-global-state';
import { PricedEquip, VehVendorAvail } from '../../../types/SearchVehicleResponse';

export type LocationCode = {
    Branchid: string,
    Branchname: string,
}

type InitialState = {
    originLocation: LocationCode | null,
    returnLocation: LocationCode | null,
    inmediatePickup: boolean | null,
    departureTime: Date,
    returnTime: Date,

    arrivalTime: '',

    extras: PricedEquip[]

    vehicle: VehVendorAvail | null
};
 
const initialState: InitialState = {
    originLocation: null,
    returnLocation: null,
    inmediatePickup: null,
    departureTime: new Date(),
    returnTime: new Date(),
    extras: [],
    vehicle: null,
    arrivalTime: '',
};

export const { useGlobalState: useCreateBookingState } = createGlobalState<InitialState>(initialState);