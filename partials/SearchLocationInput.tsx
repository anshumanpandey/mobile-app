import React, { useState } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { Layout, List, Text, Spinner } from '@ui-kitten/components';
import { TextInput, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAxios from 'axios-hooks'
import { GRCGDS_BACKEND } from 'react-native-dotenv'

export type LocationSearchInputProps = {
  pickupLocation?: string
  dropOffLocation?: string

  onOriginLocationSelected: (location: any) => void
  onReturnLocationSelected: (location: any) => void
}
const LocationSearchInput: React.FC<LocationSearchInputProps> = (props) => {
  const [searchingFor, setSearchingFor] = useState<"ORIGIN" | "RETURN">("ORIGIN");
  const [{ data, loading, error }, doSearch] = useAxios({
    url: `${GRCGDS_BACKEND}/public/locationCodes`,
  }, { manual: true })

  const onChangeText = (txt: string) => {
    doSearch({ params: { search: txt } })
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
            <TextInput onChangeText={(txt) => {
              onChangeText(txt)
              setSearchingFor("ORIGIN")
            }} style={{ fontFamily: 'SF-UI-Display_Bold', fontSize: 18, width: '100%', borderColor: 'white', borderBottomColor: '#E4E9F2', borderBottomWidth: 1 }} placeholder="Enter Origin"></TextInput>
          </Layout>
          <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput onChangeText={(txt) => {
              onChangeText(txt)
              setSearchingFor("RETURN")
            }} style={{ fontFamily: 'SF-UI-Display_Bold', fontSize: 18, width: '100%', borderColor: 'white' }} placeholder="Enter Destionation"></TextInput>
          </Layout>
        </Layout>
      </Layout>
      {loading ? (
        <Layout style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Spinner size='small'/>
        </Layout>
      ) : (
        <List
          style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}
          data={data}
          renderItem={(data: any) => {
            return (
              <TouchableWithoutFeedback onPress={() => {
                if (searchingFor === "ORIGIN") props.onOriginLocationSelected(data.item)
                if (searchingFor === "RETURN") props.onReturnLocationSelected(data.item)
              }} >
                <Layout style={{ display: 'flex', flexDirection: 'row', borderBottomColor: '#E4E9F2', borderBottomWidth: 1, paddingBottom: '5%', paddingTop: '5%' }}>
                <EvilIcon style={{ color: '#41D5FB' }} name="location" size={32} />
                <Text style={{ fontSize: 18 }}>{data.item.locationname}</Text>
                </Layout>
              </TouchableWithoutFeedback>
            );
          }}
        />
      )}
    </>
  );
}

export default LocationSearchInput