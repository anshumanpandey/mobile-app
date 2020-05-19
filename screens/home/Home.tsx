
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
import { LoginScreenProps } from '../../types';
import DrawerMenu from './CustomeDrawer';
import NotificationScreen from './NotificationScreen';
import ProfileScreen from './ProfileScreen';
import DocumentScreen from './DocumentScreen';
import MyTripsScreens from './MyTripsScreen';
import ActivateScreen from './ActivateScreen';
import LocalitationScreen from './Localitation';
import DamageScreen from './DamageScreen';
import ReservationScreen from './ReservationScreen';
import VerifyPhoneScreen from './VerifyPhoneScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

const Drawer = createDrawerNavigator();
export default ({ navigation }: StackScreenProps<LoginScreenProps>) => {

    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerMenu navigation={props.navigation} />} initialRouteName="Home">
            <Drawer.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Drawer.Screen name="VerifyPhone" component={VerifyPhoneScreen} />
            <Drawer.Screen name="Reservation" component={ReservationScreen} />
            <Drawer.Screen name="Damage" component={DamageScreen} />
            <Drawer.Screen name="Location" component={LocalitationScreen} />
            <Drawer.Screen name="Activate" component={ActivateScreen} />
            <Drawer.Screen name="MyBookings" component={MyTripsScreens} />
            <Drawer.Screen name="Notifications" component={NotificationScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Documents" component={DocumentScreen} />
        </Drawer.Navigator>
    )
};
