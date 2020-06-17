
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
import { LoginScreenProps } from '../../types';
import DrawerMenu from './CustomeDrawer';
import NotificationScreen from './NotificationScreen';
import DocumentScreen from './DocumentScreen';
import MyTripsScreens from './MyTripsScreen';
import ActivateScreen from './ActivateScreen';
import LocalitationScreen from './Localitation';
import DamageScreen from './DamageScreen';
import NoPictureDamageScreen from './NoPictureDamageScreen';
import ReservationScreen from './ReservationScreen';
import VerifyPhoneScreen from '../VerifyPhoneScreen';
import EnableOptScreen from './EnableOptScreen';
import SelectLocation from './createBookings/index';
import KeyedReservation from './KeyedReservation';
import EndRentalScreen from './EndRentalScreen';
import EditProfile from './EditProfile';

const Drawer = createDrawerNavigator();
export default ({ navigation }: StackScreenProps<LoginScreenProps>) => {

    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerMenu navigation={props.navigation} />} initialRouteName="Home">
            <Drawer.Screen name="MyBookings" component={MyTripsScreens} />
            <Drawer.Screen name="CreateBooking" component={SelectLocation} />
            <Drawer.Screen name="Location" component={LocalitationScreen} />
            <Drawer.Screen name="EnableOpt" component={EnableOptScreen} />
            <Drawer.Screen name="VerifyPhone" component={VerifyPhoneScreen} />
            <Drawer.Screen name="Reservation" component={ReservationScreen} />
            <Drawer.Screen name="EditProfile" component={EditProfile} />
            <Drawer.Screen name="Damage" component={DamageScreen} />
            <Drawer.Screen name="NoPicturDamage" component={NoPictureDamageScreen} />
            <Drawer.Screen name="Activate" component={ActivateScreen} />
            <Drawer.Screen name="Notifications" component={NotificationScreen} />
            <Drawer.Screen name="Documents" component={DocumentScreen} />
            <Drawer.Screen name="KeyedCarReservation" component={KeyedReservation} />
            <Drawer.Screen name="EndRental" component={EndRentalScreen} />
        </Drawer.Navigator>
    )
};
