import React, { useState, useEffect } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { Layout, List, Text, Spinner } from '@ui-kitten/components';
import { TextInput, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import useAxios from 'axios-hooks'
import axios, { CancelTokenSource } from 'axios';
import { GRCGDS_BACKEND } from 'react-native-dotenv'

const CancelToken = axios.CancelToken;

export type LocationSearchInputProps = {
  pickupLocation?: string
  dropOffLocation?: string

  onOriginLocationSelected: (location: any) => void
  onReturnLocationSelected: (location: any) => void
}
const LocationSearchInput: React.FC<LocationSearchInputProps> = (props) => {
  const [isFetching, setIsFetching] = useState<null | CancelTokenSource>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [originLocation, setOriginLocation] = useState<{[k: string]: any} | null>(null);
  const [returnLocation, setReturnLocation] = useState<{[k: string]: any} | null>(null);
  const [searchingFor, setSearchingFor] = useState<"ORIGIN" | "RETURN">("ORIGIN");

  const [{ data, loading, error }, doSearch] = useAxios({
    url: `${GRCGDS_BACKEND}/location/search`,
  }, { manual: true })

  const onChangeText = (txt: string) => {
    if (isFetching) isFetching.cancel()

    const source = CancelToken.source()
    setIsFetching(source);
    doSearch({ params: { q: txt, module_name: 'LOCATION_SEARCH'  } })
      .then(() => setIsFetching(null))
      .catch(() => setIsFetching(null))
  }

  useEffect(() => {
    if (loading == true) setShowModal(true)
    if (data) setShowModal(true)
  }, [loading])

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
              onChangeText(e.nativeEvent.text)
              setSearchingFor("ORIGIN")
            }} style={{ fontFamily: 'SF-UI-Display_Bold', fontSize: 18, width: '100%', borderColor: 'white', borderBottomColor: '#E4E9F2', borderBottomWidth: 1 }} placeholder="Enter Origin"></TextInput>
          </Layout>
          <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput defaultValue={returnLocation ? returnLocation.Branchname : undefined} onEndEditing={(e) => {
              onChangeText(e.nativeEvent.text)
              setSearchingFor("RETURN")
            }} style={{ fontFamily: 'SF-UI-Display_Bold', fontSize: 18, width: '100%', borderColor: 'white' }} placeholder="Enter Destionation"></TextInput>
          </Layout>
        </Layout>
      </Layout>
      <Modal onBackButtonPress={() => setShowModal(false)} isVisible={showModal} customBackdrop={<Back />} style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: '#00000000', flex: 1, margin: 0 }} >
          {loading && (
            <Layout style={{ flex: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15%' }}>
              <Spinner size='small' />
            </Layout>
          )}
          {loading == false && data && data.length == 0 && (
            <Layout style={{ height: '15%', display: 'flex', justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center', fontSize: 42 }}>No locations found</Text>
            </Layout>
          )}

          {loading == false && data && data.length !== 0 && (
            <List
              keyboardShouldPersistTaps={"handled"}
              style={{ backgroundColor: 'green', display: 'flex', flexGrow:0 }}
              data={data.reduce((prev,next) => {
                prev.push(...next.branches)
                return prev
              },[])}
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
                      <Text style={{ fontSize: 18 }}>{data.item.Branchname}</Text>
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