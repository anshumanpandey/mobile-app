import React from 'react';
import { Layout, Text, Card} from '@ui-kitten/components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView, ScrollView, Image, Alert, View } from 'react-native';
import LoadingSpinner from '../../partials/LoadingSpinner';
import { useRoute, useNavigation } from '@react-navigation/native';
import useAxios from 'axios-hooks'
import {Linking} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ResolveCurrencySymbol from '../../utils/ResolveCurrencySymbol';

const DocumentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

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

  console.log(route.params.pickupLocation)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f7f9', }}>
      <ScrollView contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1 }}>
        <View style={{ height: '90%',paddingLeft: '5%', paddingRight: '5%', display: 'flex', flexDirection: 'column' }}>
          <View style={{ width: '100%' }}>
            <Layout style={{  display: 'flex',alignItems: 'center' }}>
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

            <View style={{ flexDirection: 'row', display: 'flex',justifyContent: 'space-around' }}>
              <Layout style={{ marginBottom: '3%' }}>
                <Text style={{ textAlign: 'center', color: 'grey' }} category="c2">
                  Pickup Location
                  </Text>
                <Text style={{ textAlign: 'center', fontFamily: 'SF-UI-Display', fontSize: 14 }}>
                  {route.params.pickupLocation}
                </Text>
              </Layout>

              <Layout style={{ marginBottom: '3%' }}>
                <Text style={{ textAlign: 'center', color: 'grey' }} category="c2">
                  Dropout Location
              </Text>
                <Text style={{ textAlign: 'center', fontFamily: 'SF-UI-Display', fontSize: 14 }}>
                  {route.params.dropOffLocation}
                </Text>
              </Layout>
            </View>

            <View style={{ flexDirection: 'row', display: 'flex',justifyContent: 'space-around' }}>
              <Layout style={{ marginBottom: '3%' }}>
                <Text style={{ textAlign: 'center', color: 'grey' }} category="c2">
                  Pickup Time
                  </Text>
                <Text style={{ textAlign: 'center', fontFamily: 'SF-UI-Display', fontSize: 14 }}>
                  {route.params.pickupTime.format('HH:mm')}
                </Text>
              </Layout>

              <Layout style={{ marginBottom: '3%' }}>
                <Text style={{ textAlign: 'center', color: 'grey' }} category="c2">
                  Dropout Time
              </Text>
                <Text style={{ textAlign: 'center', fontFamily: 'SF-UI-Display', fontSize: 14 }}>
                  {route.params.dropoffTime.format('HH:mm')}
                </Text>
              </Layout>
            </View>


            <Layout style={{ marginBottom: '3%' }}>
              <Text style={{ textAlign: 'center', color: 'grey' }} category="c2">
                Final Cost
              </Text>
              <Text style={{ textAlign: 'center', fontFamily: 'SF-UI-Display', fontSize: 14 }}>
                {route.params.finalCost}
                {ResolveCurrencySymbol(route.params.currencyCode)}
              </Text>
            </Layout>

            <Layout style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
              <Text style={{ textAlign: 'center', color: 'grey' }} category="c2">
                Pickup Instructions
              </Text>
              <Text style={{ textAlign: 'center', fontFamily: 'SF-UI-Display', fontSize: 16 }}>
                {route.params.pickUpInstructions}
              </Text>
            </Layout>
          </View>

        </View>
        <View style={{ height: '10%',justifyContent: 'flex-end',alignSelf: 'flex-start',width: '100%', display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: '25%'}}>
            <TouchableOpacity style={{ height: '100%' }} onPress={() => {
              navigation.navigate('Location', {
                passTo: 'KeyedCarReservation',
                parentProps: route.params
              })
              return
              /*
              if (GPSState.isAuthorized()) {
                navigation.navigate('KeyedCarReservation', {...route.params})
              } else {
                navigation.navigate('Location', { parentProps: route.params, passTo: "KeyedCarReservation"})
              }*/
            }}>
              <View style={{ height: '100%',display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',borderColor: 'rgba(0,0,0,0.2)',  borderRightWidth: 0 }}>
                <MaterialIcons name="directions" style={{ color:'#41d5fb'}} size={24} />
                <Text style={{ marginLeft: '5%',color: 'gray', fontFamily: 'SF-UI-Display', fontSize: 12 }}>GET DIRECTIONS </Text>
              </View>

            </TouchableOpacity>
          </View>
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
              <View style={{ height: '100%',display: 'flex', justifyContent: 'center',alignItems: 'center',borderColor: 'rgba(0,0,0,0.2)',  borderRightWidth: 0,flexDirection: 'column' }}>
                <MaterialIcons name="cancel" style={{ color:'#cf1830'}} size={24} />
                <Text style={{ marginLeft: '5%',color: 'gray', fontFamily: 'SF-UI-Display', fontSize: 12 }}>CANCEL </Text>
                {cancelReq.loading ? <LoadingSpinner /> : undefined}
              </View>

            </TouchableOpacity>
          </View>

          <View style={{ width: '25%' }}>
            <TouchableOpacity style={{ height: '100%' }} onPress={() => {
              navigation.navigate('NoPicturDamage', { ...route.params })
            }}>
              <View style={{ height: '100%',borderColor: 'rgba(0,0,0,0.2)',  borderRightWidth: 0,display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
                <MaterialIcons name="report-problem" style={{ color:'#41d5fb'}} size={24} />
                <Text style={{ textAlign: 'center', color: 'gray', fontFamily: 'SF-UI-Display', fontSize: 12 }}>REPORT A PROBLEM</Text>
              </View>

            </TouchableOpacity>
          </View>

          <View style={{ width: '25%' }}>
            <TouchableOpacity style={{ height: '100%' }} onPress={() => {
              Linking.openURL(`tel:${route.params.pickupLocationPhoneNumber}`)
            }}>
              <View style={{ height: '100%',borderColor: 'rgba(0,0,0,0.2)',  display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
                <MaterialIcons name="phone" style={{ color:'#41d5fb'}} size={24} />
                <Text style={{ textAlign: 'center',color: 'gray', fontFamily: 'SF-UI-Display', fontSize: 12 }}>HELP</Text>
              </View>

            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default DocumentScreen