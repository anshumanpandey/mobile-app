import React, { useEffect } from 'react';
// @ts-ignore
import GPSState from 'react-native-gps-state'
// @ts-ignore
import SystemSetting from 'react-native-system-setting'
import { Image } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import Geolocation from '@react-native-community/geolocation';
import MenuButton from '../../partials/MenuButton';
import LocationIconComponent from '../../image/LocationIconComponent';
import { useNavigation } from '@react-navigation/native';

const DocumentScreen = () => {
  const navigation = useNavigation();

  const [position, setPosition] = React.useState<{ lat: number, lon: number } | null>(null);
  const [positionError, setPositionError] = React.useState<string | null>(null);
  const [isLocationEnabled, setIsLocationEnabled] = React.useState<boolean>(false);
  const [isLocationGprsAuthorized, setIsLocationGprsAuthorized] = React.useState<boolean>(GPSState.isDenied());

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      console.log(info)
      setPosition({
        lat: info.coords.latitude,
        lon: info.coords.longitude
      })
    }, (err) => {
      setPositionError(err.message)
      console.log(err)
    });

    SystemSetting.isLocationEnabled().then((enable: boolean) => {
      setIsLocationEnabled(enable)
      const state = enable ? 'On' : 'Off';
      console.log('Current location is ' + state);
    })

    GPSState.addListener((status: any) => {
      switch (status) {
        case GPSState.NOT_DETERMINED:
          setIsLocationGprsAuthorized(false)
          alert('Please, allow the location, for us to do amazing things for you!')
          break;

        case GPSState.RESTRICTED:
          setIsLocationGprsAuthorized(false)
          GPSState.openLocationSettings()
          break;

        case GPSState.DENIED:
          setIsLocationGprsAuthorized(false)
          alert('It`s a shame that you do not allowed us to use location :(')
          break;

        case GPSState.AUTHORIZED_ALWAYS:
          console.log('GPSState.AUTHORIZED_ALWAYS')
          setIsLocationGprsAuthorized(true)
          break;

        case GPSState.AUTHORIZED_WHENINUSE:
          console.log('GPSState.AUTHORIZED_WHENINUSE')
          setIsLocationGprsAuthorized(true)
          break;
      }
    })
  }, []);

  return (
    <Layout style={{ padding: '5%', display: 'flex', flexDirection: 'column', flex: 1 }}>
      <MenuButton />
      <Layout style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
        <LocationIconComponent />
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {isLocationGprsAuthorized ?
            <Text style={{ textAlign: 'center' }} category="h4">You have authorized the use of Geolocation</Text>
            :
            <>
              <Text style={{ textAlign: 'center', fontSize: 24, fontFamily: 'SF-UI-Display_Bold' }} category="h4">Enable Location</Text>
              <Layout style={{ width: '70%'}}>
                <Text style={{ textAlign: 'center',fontSize: 13, color: '#8F9BB3', marginBottom: '15%' }}>Choose your location to start find the request around you.</Text>
              </Layout>
              <Button
                onPress={(e) => { GPSState.requestAuthorization(GPSState.AUTHORIZED_WHENINUSE) }}
                size="giant"
                style={{
                  backgroundColor: '#41d5fb',
                  borderColor: '#41d5fb',
                  marginBottom: '15%',
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

                {() => <Text style={{ color: 'white', fontSize: 18,fontFamily: 'SF-UI-Display_Bold', textAlign: 'center',width: '100%' }}>Allow access</Text>}
              </Button>
            </>
          }

          <Text onPress={() => navigation.navigate('MyBookings')} style={{ color: '#41d5fb' }}>Skip for now</Text>


          {/*{isLocationEnabled ? (
            <Text style={{ textAlign: 'center' }} category="h4">GPS is activated</Text>
          ) : (
              <>
                <Text style={{ textAlign: 'center' }} category="h4">GPS is not activated</Text>
                <Button
                  onPress={(e) => {
                    SystemSetting.switchLocation(() => {
                      setIsLocationEnabled(true)
                    })
                  }}
                  size="giant"
                  style={{
                    backgroundColor: '#41d5fb',
                    borderColor: '#41d5fb',
                    marginBottom: '15%',
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
                  {() => <Text style={{ color: 'white' }}>Activate it</Text>}
                </Button>
              </>
            )}

          {!position ? (
            <>
              <Text>No position detected due to</Text>
              <Text>{positionError?.toString()}</Text>
            </>
          ) : (
              <>
                <Text category="h4">You latitude: {position?.lat.toString()}</Text>
                <Text category="h4">Your longitude: {position?.lon.toString()}</Text>
              </>
          )}*/}
        </Layout>

      </Layout>
    </Layout>
  );
};

export default DocumentScreen