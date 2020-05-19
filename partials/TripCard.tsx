import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';
import { Layout, Text, Card, Avatar } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

export type TripCardProps = {
  tripDate: moment.Moment
  pickupLocation: string
  pickupTime: string
  dropOffLocation: string
  dropoffTime: string

  carName: string
  registratioNumber: string
  finalCost: string
  arrivalTime: string

  leftImageUri?: string

  reservationNumber?: string

  keyLess: boolean

  completed?: boolean
  upcoming?: boolean

}
const TripCard: React.FC<TripCardProps> = (props) => {
  const navigation = useNavigation();

  return (
    <Layout style={{ backgroundColor: '#00000000', marginBottom: '5%' }}>
      <Layout style={{ backgroundColor: '#00000000', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Text style={{ marginBottom: '3%' }}>{props.tripDate.format('LLL')}</Text>
        {props.leftImageUri && (
          <Image
            style={{ width: 50, height: 50 }}
            source={require('../image/rightcars.png')}
          />
        )}

      </Layout>

      <Card onPress={() => navigation.navigate('Activate', { ...props, leftImageUri: undefined })} style={{ display: 'flex', flexDirection: 'column', borderRadius: 16, borderWidth: 0 }}>
        {props.reservationNumber && (
          <Layout style={{ marginBottom: '3%' }}>
            <Text style={{ textAlign: 'center' }} category="h6">
              Reservation Number
        </Text>
            <Text style={{ textAlign: 'center' }} category="h6">
              {props.reservationNumber}
        </Text>
          </Layout>
        )}
        <Layout style={{ display: 'flex', flexDirection: 'row' }}>
          <Layout style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: '5%' }}>
            <FontAwesomeIcon size={15} style={{ color: '#41d5fb' }} name="circle" />
            <Layout style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
              <MaterialCommunityIcon style={{ marginBottom: '15%' }} size={4} name="rectangle" />
              <MaterialCommunityIcon style={{ marginBottom: '15%' }} size={4} name="rectangle" />
              <MaterialCommunityIcon style={{ marginBottom: '15%' }} size={4} name="rectangle" />
              <MaterialCommunityIcon size={4} name="rectangle" />
            </Layout>
            <FontAwesomeIcon size={15} name="square" />
          </Layout>
          <Layout style={{ display: 'flex', flexDirection: 'column', width: '90%' }}>
            <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '5%' }}>
              <Text>{props.pickupLocation}</Text>
              <Text style={{ color: '#c8b5d3' }}>{props.pickupTime}</Text>
            </Layout>
            <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>{props.dropOffLocation}</Text>
              <Text style={{ color: '#c8b5d3' }}>{props.dropoffTime}</Text>
            </Layout>
          </Layout>
        </Layout>
        <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 1, paddingTop: '5%' }}>
          <Layout style={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
            <Layout style={{ marginRight: '3%' }}>
              <Avatar style={{ borderRadius: 10 }} shape='square' source={props.keyLess ? require('../image/keyx.png') : require('../image/key.png')} />
            </Layout>

            <Layout>
              <Text style={{ width: '90%' }} numberOfLines={1} textBreakStrategy="balanced" category='h6'>{props.carName}</Text>
              <Text>{props.registratioNumber}</Text>
            </Layout>
          </Layout>

          <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '50%' }}>
            <Layout>
              <Text style={{ color: '#c8b5d3' }}>Final cost</Text>
              <Text>{props.finalCost}</Text>
            </Layout>

            <Layout>
              <Text style={{ color: '#c8b5d3' }}>Arrival time</Text>
              <Text>{props.arrivalTime}</Text>
            </Layout>
          </Layout>

        </Layout>
      </Card>
    </Layout>

  );
}

export default TripCard