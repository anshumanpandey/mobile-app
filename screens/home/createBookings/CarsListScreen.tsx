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
import CarItem from '../../../partials/CarItem';

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
            style={{ padding: '5%' }}
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
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text style={{ fontSize: 16, textAlign: 'left', width: '50%', fontFamily: 'SF-UI-Display_Bold' }}>From: {route.params.searchParams.pickUpLocation.locationname}</Text>
                      <Text style={{ fontSize: 16, textAlign: 'left', width: '50%', fontFamily: 'SF-UI-Display_Bold' }}>To: {route.params.searchParams.dropOffLocation.locationname}</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text style={{ fontSize: 16, textAlign: 'left', width: '50%', fontFamily: 'SF-UI-Display_Bold' }}>At: {route.params.searchParams.pickUpDate.format('MMM DD, h:mm')}</Text>
                      <Text style={{ fontSize: 16, textAlign: 'left', width: '50%', fontFamily: 'SF-UI-Display_Bold' }}>Until: {route.params.searchParams.pickUpDate.format('MMM DD, h:mm')}</Text>
                    </View>
                  </View>
                );
              }

              return (
                <CarItem key={o.vehicle.deeplink} vehicle={o.vehicle} isActive={selectedIdx == idx} onClick={() => {
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
          onPress={() => {
            console.log(selectedIdx)
            console.log(cars[selectedIdx])
            navigation.navigate('CarExtras', { vehicle: cars[selectedIdx].vehicle})
          }}
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