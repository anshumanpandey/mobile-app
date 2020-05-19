import React, { useEffect } from 'react';
// @ts-ignore
import GPSState from 'react-native-gps-state'
// @ts-ignore
import SystemSetting from 'react-native-system-setting'
import { Layout, Text, Button } from '@ui-kitten/components';
import Geolocation from '@react-native-community/geolocation';
import MenuButton from '../../partials/MenuButton';

const DocumentScreen = () => {
  const [position, setPosition] = React.useState<{ lat: number, lon: number } | null>(null);
  const [positionError, setPositionError] = React.useState<string | null>(null);
  const [isLocationEnabled, setIsLocationEnabled] = React.useState<boolean>(false);
  const [isLocationGprsAuthorized, setIsLocationGprsAuthorized] = React.useState<boolean>(GPSState.isAuthorized());

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
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        { isLocationGprsAuthorized?
          <Text style={{ textAlign: 'center' }} category="h4">You have authorized the use of Geolocation</Text>
          :
          <>
            <Text style={{ textAlign: 'center' }} category="h4">Geolocation has not been authorized</Text>
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
              Allow it
              </Button>
          </>
        }

        {isLocationEnabled ? (
          <Text style={{ textAlign: 'center' }} category="h4">GPS is activated</Text>
        ) : (
            <>
              <Text style={{ textAlign: 'center' }} category="h4">GPS is not activated</Text>
              <Button
                onPress={(e) => { SystemSetting.switchLocation(() => {
                  setIsLocationEnabled(true)
                }) }}
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
                Activate it
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
          )}
      </Layout>
    </Layout>
  );
};

export default DocumentScreen