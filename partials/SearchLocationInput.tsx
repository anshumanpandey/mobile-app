import React, { useState, useEffect } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { Layout, List, Text } from '@ui-kitten/components';
import { TextInput, TouchableHighlight, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import Modal from 'react-native-modal';
import FuzzySearch from 'fuzzy-search';
import { GrcgdsLocation } from '../types';

export type LocationSearchInputProps = {
  pickupLocation?: string
  dropOffLocation?: string

  onOriginLocationSelected: (location: any) => void
  onReturnLocationSelected: (location: any) => void
}
const LocationSearchInput: React.FC<LocationSearchInputProps> = (props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [originLocation, setOriginLocation] = useState<{[k: string]: any} | null>(null);
  const [returnLocation, setReturnLocation] = useState<{[k: string]: any} | null>(null);
  const [searchingFor, setSearchingFor] = useState<"ORIGIN" | "RETURN">("ORIGIN");
  const [locations, setLocations] = useState<GrcgdsLocation[]>([]);
  const [resultLocations, setResultLocations] = useState<GrcgdsLocation[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('locationsData')
    .then(stringData => {
      if (!stringData) return
      try {
        const jsonData = JSON.parse(stringData)
        setLocations(jsonData);
      } catch (error) {
        console.log('We could not parse the string location data: ' + error.toString());
      }
    })
  }, [])

  const Back: React.FC = ({ children }) => {
    return (
      <TouchableWithoutFeedback onPress={() => setShowModal(false)} >
        <Layout style={{ top: 0, bottom: 0, left: 0, right: 0, flex: 1, position: 'absolute', zIndex: 5, backgroundColor: '#000000' }}>
          {children}
        </Layout>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <>
      <Layout style={{ display: 'flex', flexDirection: 'row' }}>

        <Layout style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
          <FontAwesomeIcon size={15} style={{ color: '#41d5fb' }} name="circle" />
          <Layout style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <MaterialCommunityIcon style={{ marginBottom: '15%' }} size={4} name="rectangle" />
            <MaterialCommunityIcon style={{ marginBottom: '15%' }} size={4} name="rectangle" />
            <MaterialCommunityIcon size={4} name="rectangle" />
          </Layout>
          <FontAwesomeIcon size={15} name="square" />
        </Layout>
        <Layout style={{ display: 'flex', flexDirection: 'column' }}>
          <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput defaultValue={originLocation ? originLocation.Branchname : undefined} onEndEditing={(e) => {
              const searcher = new FuzzySearch(locations, ['internalcode', 'locationname', "locationvariation"]);
              const result = searcher.search(e.nativeEvent.text)
              setResultLocations(result)
              setShowModal(true)
              setSearchingFor("ORIGIN")
            }} style={{ fontFamily: 'SF-UI-Display_Bold', fontSize: 18, width: '100%', borderColor: 'white', borderBottomColor: '#E4E9F2', borderBottomWidth: 1 }} placeholder="Enter Origin"></TextInput>
          </Layout>
          <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput defaultValue={returnLocation ? returnLocation.Branchname : undefined} onEndEditing={(e) => {
              const searcher = new FuzzySearch(locations, ['internalcode', 'locationname', "locationvariation"]);
              const result = searcher.search(e.nativeEvent.text)
              setResultLocations(result)
              setShowModal(true)
              setSearchingFor("RETURN")
            }} style={{ fontFamily: 'SF-UI-Display_Bold', fontSize: 18, width: '100%', borderColor: 'white' }} placeholder="Enter Destionation"></TextInput>
          </Layout>
        </Layout>
      </Layout>
      <Modal onBackButtonPress={() => setShowModal(false)} isVisible={showModal} customBackdrop={<Back />} style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: '#00000000', flex: 1, margin: 0 }} >

          {resultLocations.length !== 0 && (
            <List
              keyboardShouldPersistTaps={"handled"}
              style={{ backgroundColor: 'green', display: 'flex', flexGrow:0 }}
              data={resultLocations}
              renderItem={(data: any) => {
                let extraStyles = {}
                if (data.index == 0) {
                  extraStyles = {
                    borderTopRightRadius: 30, borderTopLeftRadius: 30
                  }
                }
                return (
                  <TouchableHighlight onPress={() => {
                    if (searchingFor === "ORIGIN") {
                      props.onOriginLocationSelected(data.item)
                      setOriginLocation(data.item)
                    }
                    if (searchingFor === "RETURN") {
                      props.onReturnLocationSelected(data.item)
                      setReturnLocation(data.item)
                    }
                    setShowModal(false)
                  }} >
                    <Layout style={{ display: 'flex', flexDirection: 'row', borderBottomColor: '#E4E9F2', borderBottomWidth: 1, paddingBottom: '5%', paddingTop: '5%' }}>
                      <EvilIcon style={{ color: '#41D5FB' }} name="location" size={32} />
                      <Text style={{ fontSize: 18 }}>{data.item.locationname}</Text>
                    </Layout>
                  </TouchableHighlight>
                );
              }}
            />
            )}

      </Modal>
    </>
  );
}

export default LocationSearchInput