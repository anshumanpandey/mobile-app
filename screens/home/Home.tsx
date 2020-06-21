
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
import { LoginScreenProps } from '../../types';
import DrawerMenu from './CustomeDrawer';
import NotificationScreen from './NotificationScreen';
import DocumentScreen from './DocumentUpload/DocumentScreen';
import DocumentMetadataScreen from './DocumentUpload/DocumentMetadataScreen';
import MyTripsScreens from './MyTripsScreen';
import ActivateScreen from './ActivateScreen';
import LocalitationScreen from './Localitation';
import DamageScreen from './DamageScreen';
import NoPictureDamageScreen from './NoPictureDamageScreen';
import ReservationScreen from './ReservationScreen';
import SelectLocation from './createBookings/index';
import KeyedReservation from './KeyedReservation';
import EndRentalScreen from './EndRentalScreen';
import EditProfile from './EditProfile';
import { useGlobalState } from '../../state';
import userHasFullProfile from '../../utils/userHasFullProfile';
import userHasAllFiles from '../../utils/userHasAllFiles';

const Drawer = createDrawerNavigator();
export default ({ navigation }: StackScreenProps<LoginScreenProps>) => {
    const [profile] = useGlobalState('profile')

    const screens = [
        <Drawer.Screen name="EditProfile" component={EditProfile} />,
        <Drawer.Screen name="Documents" component={DocumentScreen} />,
        <Drawer.Screen name="DocumentMetadata" component={DocumentMetadataScreen} />,
    ]

    const hasFullProfile = userHasFullProfile(profile || {})
    const hasAllFiles = userHasAllFiles(profile || {})

    if (hasFullProfile && hasAllFiles) {
        screens.push(
            <Drawer.Screen name="CreateBooking" component={SelectLocation} />,
            <Drawer.Screen name="Location" component={LocalitationScreen} />,
            <Drawer.Screen name="Reservation" component={ReservationScreen} />,
            <Drawer.Screen name="Damage" component={DamageScreen} />,
            <Drawer.Screen name="NoPicturDamage" component={NoPictureDamageScreen} />,
            <Drawer.Screen name="Activate" component={ActivateScreen} />,
            <Drawer.Screen name="Notifications" component={NotificationScreen} />,
            <Drawer.Screen name="KeyedCarReservation" component={KeyedReservation} />,
            <Drawer.Screen name="EndRental" component={EndRentalScreen} />,
        )
        screens.unshift(<Drawer.Screen name="MyBookings" component={MyTripsScreens} />)
    }

    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerMenu navigation={props.navigation} />} initialRouteName="Home">
            {screens.map((s) => s)}
        </Drawer.Navigator>
    )
};
