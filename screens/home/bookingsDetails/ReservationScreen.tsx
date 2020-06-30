import React, { useEffect } from 'react';
import { Layout, Text, Card } from '@ui-kitten/components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView, ScrollView, Image, Alert, View } from 'react-native';
import LoadingSpinner from '../../../partials/LoadingSpinner';
import { useRoute, useNavigation } from '@react-navigation/native';
import useAxios from 'axios-hooks'
import { Linking } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ResolveCurrencySymbol from '../../../utils/ResolveCurrencySymbol';
import ReportScreen from './ReportScreen';
import KeyedReservationScreen from './KeyedReservation';
import CompletedReportScreen from './CompletedReportScreen';
import AgreementScreen from './AgreementScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createGlobalState } from 'react-hooks-global-state';

const DocumentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f7f9', }}>
      <ScrollView contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1 }}>
        <View style={{ paddingTop: '5%',height: '90%', paddingLeft: '5%', paddingRight: '5%', display: 'flex', flexDirection: 'column' }}>
          <View style={{ width: '100%' }}>
            <Layout style={{ display: 'flex', alignItems: 'center' }}>
              <Text style={{ textAlign: 'center' }} category="h6">
                CONFIRMATION
              </Text>
              <Text style={{ lineHeight: 20, textAlign: 'center', fontFamily: 'SF-UI-Display_Bold', fontSize: 18 }} >
                {route.params.registratioNumber}{' '}
              </Text>
              <Image
                style={{ width: 200, height: 200, resizeMode: 'contain' }}
                source={{ uri: route.params.image_preview_url }}
              />
            </Layout>

            <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-around' }}>
              <Layout style={{ marginBottom: '3%' }}>
                <Text style={{ textAlign: 'center', color: 'grey', fontFamily: 'SF-UI-Display_Bold' }} category="c2">
                  Pickup Location
                  </Text>
                <Text style={{ textAlign: 'center', fontFamily: 'SF-UI-Display', fontSize: 14 }}>
                  {route.params.pickupLocation}
                </Text>
              </Layout>

              <Layout style={{ marginBottom: '3%' }}>
                <Text style={{ textAlign: 'center', color: 'grey', fontFamily: 'SF-UI-Display_Bold' }} category="c2">
                  Dropout Location
              </Text>
                <Text style={{ textAlign: 'center', fontFamily: 'SF-UI-Display', fontSize: 14 }}>
                  {route.params.dropOffLocation}
                </Text>
              </Layout>
            </View>

            <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-around' }}>
              <Layout style={{ marginBottom: '3%' }}>
                <Text style={{ textAlign: 'center', color: 'grey', fontFamily: 'SF-UI-Display_Bold' }} category="c2">
                  Pickup Time
                  </Text>
                <Text style={{ textAlign: 'center', fontFamily: 'SF-UI-Display', fontSize: 14 }}>
                  {route.params.pickupTime.format('HH:mm')}
                </Text>
              </Layout>

              <Layout style={{ marginBottom: '3%' }}>
                <Text style={{ textAlign: 'center', color: 'grey', fontFamily: 'SF-UI-Display_Bold' }} category="c2">
                  Dropout Time
              </Text>
                <Text style={{ textAlign: 'center', fontFamily: 'SF-UI-Display', fontSize: 14 }}>
                  {route.params.dropoffTime.format('HH:mm')}
                </Text>
              </Layout>
            </View>


            <Layout style={{ marginBottom: '3%' }}>
              <Text style={{ textAlign: 'center', color: 'grey', fontFamily: 'SF-UI-Display_Bold' }} category="c2">
                Final Cost
              </Text>
              <Text style={{ textAlign: 'center', fontFamily: 'SF-UI-Display', fontSize: 14 }}>
                {route.params.finalCost}
                {ResolveCurrencySymbol(route.params.currencyCode)}
              </Text>
            </Layout>

            <Layout style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
              <Text style={{ textAlign: 'center', color: 'grey', fontFamily: 'SF-UI-Display_Bold' }} category="c2">
                Pickup Instructions
              </Text>
              <Text style={{ textAlign: 'center', fontFamily: 'SF-UI-Display', fontSize: 16 }}>
                {route.params.pickUpInstructions}
              </Text>
            </Layout>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export const { useGlobalState: useCarDetailState } = createGlobalState({ details: {} })


const Tab = createBottomTabNavigator();
export default function App({ navigation, route }) {

  const [cancelReq, cancelBooking] = useAxios({
    url: `https://OTA.right-cars.com/`,
    method: 'POST',
    data: `<OTA_VehCancelRQ xmlns="http://www.opentravel.org/OTA/2003/05"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05
    VehCancelRQ.xsd">
    <POS>
    <Source>
    <RequestorID Type="5" ID="MOBILE001" />
    </Source>
    </POS>
    <VehCancelRQCore>
    <ResNumber Number="${route.params.registratioNumber}"/>
    </VehCancelCore>
    <VehCancelRQInfo>
    </VehCancelRQInfo>
    </OTA_VehCancelRQ>`,
    headers: {
      "Content-Type": "application/soap+xml;charset=utf-8"
    },
  }, { manual: true })

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={DocumentScreen}
        options={{
          tabBarButton: () => <></>,
        }}
      />

      <Tab.Screen
        name="CompletedReport"
        component={CompletedReportScreen}
        options={{
          tabBarButton: () => <></>,
        }}
      />

      <Tab.Screen
        name="Agreement"
        component={AgreementScreen}
        options={{
          tabBarButton: () => <></>,
        }}
      />

      <Tab.Screen
        name="KeyedReservation"
        component={KeyedReservationScreen}
        options={{
          tabBarButton: () => <></>,
        }}
      />

      <Tab.Screen
        name="Directions"
        component={() => <></>}
        options={{
          tabBarButton: () => {
            return (
              <View style={{ width: '25%' }}>
                <TouchableOpacity style={{ height: '100%' }} onPress={() => {
                  navigation.navigate('KeyedReservation', route.params.params)
                  return

                }}>
                  <View style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderColor: 'rgba(0,0,0,0.2)', borderRightWidth: 0 }}>
                    <MaterialIcons name="location-on" style={{ color: '#41d5fb' }} size={24} />
                    <Text style={{ marginLeft: '5%', color: 'gray', fontFamily: 'SF-UI-Display', fontSize: 12 }}>DIRECTIONS</Text>
                  </View>

                </TouchableOpacity>
              </View>
            );
          }
        }}
      />
      <Tab.Screen
        name="Cancel"
        component={() => <></>}
        options={{
          tabBarButton: () => {
            return (
              <View style={{ width: '25%' }}>
                <TouchableOpacity style={{ height: '100%' }} onPress={() => {
                  Linking.openURL(`tel:${route.params.params.pickupLocationPhoneNumber}`)
                }}>
                  <View style={{ height: '100%', borderColor: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
                    <MaterialIcons name="phone" style={{ color: '#41d5fb' }} size={24} />
                    <Text style={{ textAlign: 'center', color: 'gray', fontFamily: 'SF-UI-Display', fontSize: 12 }}>HELP</Text>
                  </View>

                </TouchableOpacity>
              </View>
            );
          }
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{
          tabBarButton: () => {
            return (
              <View style={{ width: '25%' }}>
                <TouchableOpacity style={{ height: '100%' }} onPress={() => {
                  navigation.navigate('Report', { ...route.params })
                }}>
                  <View style={{ height: '100%', borderColor: 'rgba(0,0,0,0.2)', borderRightWidth: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
                    <MaterialIcons name="directions-car" style={{ color: '#41d5fb' }} size={24} />
                    <Text style={{ textAlign: 'center', color: 'gray', fontFamily: 'SF-UI-Display', fontSize: 12 }}>COLLECT</Text>
                  </View>

                </TouchableOpacity>
              </View>
            );
          }
        }}
      />

      <Tab.Screen
        name="Help"
        component={() => <></>}
        options={{
          tabBarButton: () => {
            return (
              <View style={{ width: '25%' }}>
                <TouchableOpacity style={{ height: '100%' }} onPress={() => {
                  if (cancelReq.loading) return
                  cancelBooking()
                    .then((r) => {
                      console.log(r.data)
                      if (r.data.includes('Errors')) {
                        Alert.alert('Error', 'Reservation Not Found')
                        return;
                      }

                      if (navigation.canGoBack()) {
                        navigation.goBack()
                      }
                    })
                }}>
                  <View style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderColor: 'rgba(0,0,0,0.2)', borderRightWidth: 0, flexDirection: 'column' }}>
                    <MaterialIcons name="cancel" style={{ color: '#cf1830' }} size={24} />
                    <Text style={{ marginLeft: '5%', color: 'gray', fontFamily: 'SF-UI-Display', fontSize: 12 }}>CANCEL </Text>
                    {cancelReq.loading ? <LoadingSpinner /> : undefined}
                  </View>

                </TouchableOpacity>
              </View>
            );
          }
        }}
      />
    </Tab.Navigator>
  );
}
