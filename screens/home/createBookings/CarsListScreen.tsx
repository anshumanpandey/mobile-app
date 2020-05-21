import React, { useState, useEffect } from 'react';
import { Layout, Text, List, Button } from '@ui-kitten/components';
import { SafeAreaView, Image, TouchableWithoutFeedback, Dimensions, View } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { useRoute, useNavigation } from '@react-navigation/native';
import GetCategoryByAcrissCode from '../../../utils/GetCategoryByAcrissCode';
import ResolveCurrencySymbol from '../../../utils/ResolveCurrencySymbol';
import ResolveTransmission from '../../../utils/ResolveTransmission';
import ResolveDoors from '../../../utils/ResolveDoors';
import LocationSearchInput from '../../../partials/SearchLocationInput';

type Vehicle = {
  doors: string | number;
  seats: string | number;
  luggages?: string | number;
  name: string;
  transmission: string;
  acriss: string;
  price: number;
  secondary_price: number;
  currency?: string,
  custom_location: string
  image_preview_url?: string
  suppliername?: string
  carrentalcompanyname?: string
  supplier_logo?: string
  airConditioner: string
  clickThroughUrl: string
  [k: string]: any | undefined
}

const hightLightStyles = {
  backgroundColor: '#41d5fb',
  priceColor: 'white'
}

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2
};

const STYLES_FOR: { [k: string]: any } = {}

const ListItem = ({ vehicle, isActive, onClick }: { onClick: () => void, isActive: boolean, vehicle: Vehicle }) => {
  const currentStyles = isActive ? hightLightStyles : { backgroundColor: '#f7f8fa', priceColor: 'black' }

  return (
    <TouchableWithoutFeedback onPress={() => onClick()}>
      <Layout style={{ padding: '2%', marginBottom: '1%', borderRadius: 16, display: 'flex', flexDirection: 'row', backgroundColor: currentStyles.backgroundColor }}>
        <Layout style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '70%', backgroundColor: '#00000000' }}>

          <Layout style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#00000000' }}>
            <Layout style={{ width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000000' }}>
              <Image source={{ uri: vehicle.image_preview_url }} style={{ flex: 1, width: 80, height: 80, resizeMode: 'contain' }} />
            </Layout>


            <Layout style={{ backgroundColor: '#00000000' }}>
              <Text style={{ fontSize: 16, fontFamily: 'SF-UI-Display_Bold' }}>{GetCategoryByAcrissCode(vehicle.acriss)}</Text>
              <Text style={{ fontSize: 10 }}>{vehicle.name}</Text>
              <Text>Mileage: Unlimited</Text>
            </Layout>
          </Layout>


          <Layout style={{ width: '100%', display: 'flex', flexDirection: 'row', backgroundColor: '#00000000' }}>
            <Layout style={{ display: 'flex', flexDirection: 'row' }}>
              <Image source={require('../../../image/door.png')} style={{ width: 20, height: 20 }} />
              <Text>{ResolveDoors(vehicle.acriss)}</Text>
            </Layout>
            {(vehicle.seats !== null && vehicle.seats !== undefined && vehicle.seats !== 0) && (
              <Layout style={{ display: 'flex', flexDirection: 'row' }}>
                <Image source={require('../../../image/seats.png')} style={{ width: 20, height: 20 }} />
                <Text>{vehicle.seats}</Text>
              </Layout>
            )}
            {vehicle.ac && (
              <Image source={require('../../../image/AC.png')} style={{ width: 20, height: 20 }} />
            )}
            {ResolveTransmission(vehicle.acriss) && (
              <Image source={require('../../../image/manual.png')} style={{ width: 20, height: 20 }} />
            )}
          </Layout>
        </Layout>

        <Layout style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '30%', backgroundColor: '#00000000' }}>
          <Image source={{ uri: vehicle.supplier_logo }} style={{ flex: 1, width: 50, height: 50, resizeMode: 'contain' }} />
          <Image source={require('../../../image/key.png')} style={{ flex: 1, width: 40, height: 40, resizeMode: 'contain' }} />
          <Layout style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#00000000' }}>
            <Text style={{ color: currentStyles.priceColor }}>{ResolveCurrencySymbol(vehicle.currency || '')} </Text>
            <Text style={{ color: currentStyles.priceColor }}>{vehicle.price}</Text>
          </Layout>
        </Layout>
      </Layout>
    </TouchableWithoutFeedback>
  );
}

const _dataProvider = new DataProvider((r1, r2) => r1.vehicle.deeplink !== r2.vehicle.deeplink)

const DocumentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [selectedIdx, setSelectedIdx] = useState(-1)

  const cars = route.params.cars

  const [dataToUse, setDataToUse] = useState(_dataProvider.cloneWithRows(cars));

  useEffect(() => {
    cars.unshift({ header: true, vehicle: {deeplink: 'q'} })
  },[])

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <View style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
        {route.params.cars.length == 0 && (
          <>
            <Text style={{ fontSize: 28, textAlign: 'center' }}>No cars found :(</Text>
            <Text style={{ fontSize: 24, textAlign: 'center' }}>Go back and change you search params</Text>
          </>
        )}
        {route.params.cars.length != 0 && (
          <RecyclerListView
            style={{ paddingLeft: '5%', paddingRight: '5%' }}
            layoutProvider={new LayoutProvider(
              index => {
                if (index == 0) return 'HEADER'
                return 0
              },
              (type, dim) => {
                if (type === 'HEADER') {
                  dim.width = Dimensions.get("window").width - ((Dimensions.get("window").width / 100) * 10);
                  dim.height = (Dimensions.get("window").height / 100) * 11;
                } else {
                  dim.width = Dimensions.get("window").width - ((Dimensions.get("window").width / 100) * 10);
                  dim.height = (Dimensions.get("window").height / 100) * 18;
                }
              }
            )}
            dataProvider={dataToUse}
            rowRenderer={(type, o, idx) => {

              if (o.header) {
                return (
                  <View>
                    <View style={{ display: 'flex', flexDirection: 'row', paddingLeft: '5%', paddingRight: '5%' }}>
                      <Text style={{ fontSize: 16, textAlign: 'left', width: '50%', fontFamily: 'SF-UI-Display_Bold' }}>From: {route.params.searchParams.pickUpLocation.locationname}</Text>
                      <Text style={{ fontSize: 16, textAlign: 'left', width: '50%', fontFamily: 'SF-UI-Display_Bold' }}>To: {route.params.searchParams.dropOffLocation.locationname}</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', paddingLeft: '5%', paddingRight: '5%' }}>
                      <Text style={{ fontSize: 16, textAlign: 'left', width: '50%', fontFamily: 'SF-UI-Display_Bold' }}>At: {route.params.searchParams.pickUpDate.format('MMM DD, h:mm')}</Text>
                      <Text style={{ fontSize: 16, textAlign: 'left', width: '50%', fontFamily: 'SF-UI-Display_Bold' }}>Until: {route.params.searchParams.pickUpDate.format('MMM DD, h:mm')}</Text>
                    </View>
                  </View>
                );
              }

              return (
                <ListItem key={o.vehicle.deeplink} vehicle={o.vehicle} isActive={selectedIdx == idx} onClick={() => {
                  if (idx == selectedIdx) return setSelectedIdx(-1)
                  return setSelectedIdx(idx)
                }} />
              );
            }}

          />
        )}
      </View>
      {route.params.cars.length == 0 && (
        <Button
          onPress={() => navigation.goBack()}
          size="medium"
          style={{
            backgroundColor: '#41d5fb',
            borderColor: '#41d5fb',
            width: '80%',
            marginBottom: '5%',
            borderRadius: 10,
            shadowColor: '#41d5fb',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.51,
            shadowRadius: 13.16,
            elevation: 10,
          }}>
          {() => <Text style={{ fontFamily: 'SF-UI-Display_Bold', color: 'white', fontSize: 18 }}>Go back</Text>}
        </Button>
      )}
      {route.params.cars.length != 0 && (
        <Button
          onPress={() => console.log('booking')}
          disabled={selectedIdx == -1 ? true : false}
          size="medium"
          style={{
            backgroundColor: selectedIdx != -1 ? '#41d5fb' : '#e4e9f2',
            borderColor: selectedIdx != -1 ? '#41d5fb' : '#e4e9f2',
            width: '80%',
            marginBottom: '5%',
            borderRadius: 10,
            shadowColor: '#41d5fb',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.51,
            shadowRadius: 13.16,
            elevation: 10,
          }}>
          {() => <Text style={{ fontFamily: 'SF-UI-Display_Bold', color: 'white', fontSize: 18 }}>BOOK NOW</Text>}
        </Button>
      )}
    </SafeAreaView>
  );
};

export default DocumentScreen