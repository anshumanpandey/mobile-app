import React, { useState, useEffect } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { Layout, List, Text, Toggle } from '@ui-kitten/components';
import { TextInput, TouchableHighlight, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import Modal from 'react-native-modal';
import FuzzySearch from 'fuzzy-search';
import { GrcgdsLocation } from '../types';

export type LocationSearchInputProps = {
  pickupLocation?: { [k: string]: any } | null
  returnLocation?: { [k: string]: any } | null

  onResultChange: (location: any, type: "ORIGIN" | "RETURN") => void
}
const LocationSearchInput: React.FC<LocationSearchInputProps> = (props) => {
  const [searchingFor, setSearchingFor] = useState<"ORIGIN" | "RETURN">("ORIGIN");
  const [locations, setLocations] = useState<GrcgdsLocation[]>([]);
  const [returnSameLocation, setReturnSameLocation] = useState<boolean>(true);

  console.log(props.pickupLocation)

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

  return (
    <>
      <Layout style={{ display: 'flex', flexDirection: 'row' }}>

        {!returnSameLocation && (
          <Layout style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            <FontAwesomeIcon size={15} style={{ color: '#41d5fb' }} name="circle" />
            <Layout style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
              <MaterialCommunityIcon style={{ marginBottom: '5%' }} size={4} name="rectangle" />
              <MaterialCommunityIcon style={{ marginBottom: '5%' }} size={4} name="rectangle" />
              <MaterialCommunityIcon size={4} name="rectangle" />
            </Layout>
            <FontAwesomeIcon size={15} name="square" />
          </Layout>
        )}
        <Layout style={{ display: 'flex', flexDirection: 'column' }}>
          <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput defaultValue={props.pickupLocation ? props.pickupLocation.locationname : undefined} onChangeText={(e) => {
              const searcher = new FuzzySearch(locations, ['internalcode', 'locationname', "locationvariation"]);
              const result = searcher.search(e)
              props.onResultChange(result, "ORIGIN")
              setSearchingFor("ORIGIN")
            }} style={{ fontFamily: 'SF-UI-Display_Bold', fontSize: 18, width: '100%', borderColor: 'white', borderBottomColor: '#E4E9F2', borderBottomWidth: 1 }} placeholder="Enter Origin"></TextInput>
          </Layout>
          {!returnSameLocation && (
            <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextInput defaultValue={props.returnLocation ? props.returnLocation.locationname : undefined} onChangeText={(e) => {
                const searcher = new FuzzySearch(locations, ['internalcode', 'locationname', "locationvariation"]);
                const result = searcher.search(e)
                props.onResultChange(result, "RETURN")
                setSearchingFor("RETURN")
              }} style={{ fontFamily: 'SF-UI-Display_Bold', fontSize: 18, width: '100%', borderColor: 'white' }} placeholder="Enter Destionation"></TextInput>
            </Layout>
          )}
        </Layout>
      </Layout>
      <Toggle checked={returnSameLocation} style={{ marginBottom: '3%' }} onChange={() => setReturnSameLocation(p => !p)}>
        Return car on same location
                    </Toggle>
    </>
  );
}

export default LocationSearchInput