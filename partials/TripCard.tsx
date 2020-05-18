import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Layout, Text, Button, TabBar, Tab, Datepicker, NativeDateService, TabView, Card, Avatar } from '@ui-kitten/components';

type Props = {
  tripDate: string
  pickupLocation: string
  pickupTime: string
  dropOffLocation: string
  dropoffTime: string

  driver: string
  score: string
  finalCost: string
  arrivalTime: string

}
const TripCard: React.FC<Props> = (props) => {
  return (
    <Layout style={{ backgroundColor: '#00000000', marginBottom: '5%' }}>
      <Text style={{ marginBottom: '3%' }}>{props.tripDate}</Text>

      <Card style={{ display: 'flex', flexDirection: 'column', borderRadius: 16, borderWidth: 0 }}>
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
          <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Layout style={{ marginRight: '3%' }}>
              <Avatar style={{ borderRadius: 10 }} shape='square' source={{ uri: "http://lorempixel.com/400/400" }} />
            </Layout>

            <Layout>
              <Text category='h6'>{props.driver}</Text>
              <Text>{props.score}</Text>
            </Layout>
          </Layout>

          <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Layout style={{ marginRight: '5%' }}>
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