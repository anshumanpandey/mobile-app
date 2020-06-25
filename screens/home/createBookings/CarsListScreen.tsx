import React, { useState, useEffect } from 'react';
import { Layout, Text, List, Button } from '@ui-kitten/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import { SafeAreaView, Image, TouchableOpacity, Dimensions, View } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import CarItem from '../../../partials/CarItem';
import { useCreateBookingState } from './CreateBookingState';
import { VehVendorAvail, VehRentalCore } from '../../../types/SearchVehicleResponse';

const _dataProvider = new DataProvider((r1, r2) => r1.VehID !== r2.VehID)

type ParamList = {
  CarsList: {
    cars: VehVendorAvail[];
  };
};
const DocumentScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'CarsList'>>();
  const navigation = useNavigation();
  const [, setVehicle] = useCreateBookingState('vehicle')
  const [selectedIdx, setSelectedIdx] = useState(-1)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showSortModal, setShowSortModal] = useState(false)
  const [sortState, setSortState] = useState<"LowToHigh" | "HighToLow">("LowToHigh")

  const [carTransmissionOptions, setCarTransmissionOptions] = useState([])
  const [carTypeOptions, setCarTypeOptions] = useState([])
  const [carClassOptions, setCarClassOptions] = useState([])

  const cars = route.params.cars

  const [dataToUse, setDataToUse] = useState(_dataProvider.cloneWithRows(cars));

  useEffect(() => {
    cars.unshift({ header: true, vehicle: { deeplink: 'q' } })
    const sortedCars = cars
      .sort((a, b) => {
        if (!a.TotalCharge) return 1
        if (!b.TotalCharge) return 1
        if (sortState == "LowToHigh") return parseFloat(a.TotalCharge.RateTotalAmount) - parseFloat(b.TotalCharge.RateTotalAmount)
        if (sortState == "HighToLow") return parseFloat(b.TotalCharge.RateTotalAmount) - parseFloat(a.TotalCharge.RateTotalAmount)
      });
    setDataToUse(_dataProvider.cloneWithRows(sortedCars))
    const transmissions = cars
      .filter(c => c.VehID)
      .map(c => c.Vehicle.TransmissionType);
    setCarTransmissionOptions(Array.from((new Set(transmissions)).values()))

    const categories = cars
      .filter(c => c.VehID)
      .map(c => c.Vehicle.VehType.VehicleCategory);
    setCarTypeOptions(Array.from((new Set(categories)).values()))

    const classes = cars
      .filter(c => c.VehID)
      .map(c => c.Vehicle.VehClass.Size);
    setCarClassOptions(Array.from((new Set(classes)).values()))
  }, [])

  useEffect(() => {
    const sortedCars = cars
      .sort((a, b) => {
        if (!a.TotalCharge) return 1
        if (!b.TotalCharge) return 1
        if (sortState == "LowToHigh") return parseFloat(a.TotalCharge.RateTotalAmount) - parseFloat(b.TotalCharge.RateTotalAmount)
        if (sortState == "HighToLow") return parseFloat(b.TotalCharge.RateTotalAmount) - parseFloat(a.TotalCharge.RateTotalAmount)
      });
    setDataToUse(_dataProvider.cloneWithRows(sortedCars))
  }, [sortState])

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
                  dim.height = (Dimensions.get("window").height / 100) * 42;
                }
              }
            )}
            dataProvider={dataToUse}
            rowRenderer={(type, o: VehVendorAvail, idx) => {

              // @ts-ignore
              if (o.header) {
                return (
                  <>
                    <View>
                      <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, textAlign: 'left', width: '50%', fontFamily: 'SF-UI-Display_Bold' }}>From: {route.params.searchParams.pickUpLocation.Branchname}</Text>
                        <Text style={{ fontSize: 16, textAlign: 'left', width: '50%', fontFamily: 'SF-UI-Display_Bold' }}>To: {route.params.searchParams.dropOffLocation.Branchname}</Text>
                      </View>

                      <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, textAlign: 'left', width: '50%', fontFamily: 'SF-UI-Display_Bold' }}>At: {route.params.searchParams.pickUpDate.format('MMM DD, h:mm')}</Text>
                        <Text style={{ fontSize: 16, textAlign: 'left', width: '50%', fontFamily: 'SF-UI-Display_Bold' }}>Until: {route.params.searchParams.dropOffDate.format('MMM DD, h:mm')}</Text>
                      </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', }}>
                      <TouchableOpacity onPress={() => setShowSortModal(true)} >
                        <View style={{ width: '70%', display: 'flex', flexDirection: 'row', justifyContent: 'center', borderWidth: 1, borderColor: '#00000050' }}>
                          <MaterialCommunityIcons style={{ alignSelf: 'flex-start' }} name={"sort-variant"} size={18} />
                          <Text style={{ fontSize: 16, textAlign: 'center', width: '50%', fontFamily: 'SF-UI-Display_Bold' }}>
                            Sort By
                        </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setShowFilterModal(true)}>
                        <View style={{ width: '70%', display: 'flex', flexDirection: 'row', justifyContent: 'center', borderWidth: 1, borderColor: '#00000050' }}>
                          <MaterialCommunityIcons name={"filter"} size={18} />
                          <Text style={{ fontSize: 16, textAlign: 'center', width: '50%', fontFamily: 'SF-UI-Display_Bold' }}>

                            Filter
                        </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                );
              }

              return (
                <CarItem key={o.VehID} vehicle={o} isActive={selectedIdx == idx} onClick={() => {
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
            setVehicle(cars[selectedIdx])
            navigation.navigate('CarExtras', { vehicle: cars[selectedIdx] })
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
      <Modal
        onBackdropPress={() => setShowSortModal(false)}
        isVisible={showSortModal}
        style={{
          marginHorizontal: 0,
          margin: 0,
        }}>
        <Layout style={{ height: '100%', padding: '3%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ marginBottom: '6%' }} category="h3">Sort By</Text>
            <Text onPress={() => setShowSortModal(false)} style={{ fontFamily: 'SF-UI-Display_Bold' }} category="h3">X</Text>
          </View>
          <TouchableOpacity onPress={() => {
            setShowSortModal(false)
            setSortState("LowToHigh")
          }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ marginBottom: '4%' }} category="h5">
                Price low to high
              </Text>
              {sortState == "LowToHigh" && <MaterialCommunityIcons style={{ alignSelf: 'flex-start' }} name={"check"} size={24} />}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setShowSortModal(false)
            setSortState("HighToLow")
          }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ marginBottom: '4%' }} category="h5">
                Price hight to low
            </Text>
              {sortState == "HighToLow" && <MaterialCommunityIcons style={{ alignSelf: 'flex-start' }} name={"check"} size={24} />}
            </View>
          </TouchableOpacity>
        </Layout>
      </Modal>

      <Modal
        onBackdropPress={() => setShowFilterModal(false)}
        isVisible={showFilterModal}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
        }}>
        <Layout style={{ height: '100%', padding: '3%' }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ marginBottom: '6%' }} category="h3">Filter By</Text>
            <Text onPress={() => setShowSortModal(false)} style={{ fontFamily: 'SF-UI-Display_Bold' }} category="h3">X</Text>
          </View>
          {carTransmissionOptions.map(i => {
            return (
              <TouchableOpacity onPress={() => {
                setShowSortModal(false)
                setSortState("LowToHigh")
              }}>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginBottom: '4%' }} category="h5">
                    {i}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {carTypeOptions.map(i => {
            return (
              <TouchableOpacity onPress={() => {
                setShowSortModal(false)
                setSortState("LowToHigh")
              }}>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginBottom: '4%' }} category="h5">
                    {i}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {carClassOptions.map(i => {
            return (
              <TouchableOpacity onPress={() => {
                setShowSortModal(false)
                setSortState("LowToHigh")
              }}>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginBottom: '4%' }} category="h5">
                    {i}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}


        </Layout>
      </Modal>
    </SafeAreaView>
  );
};

export default DocumentScreen