import React from 'react';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';
import { dispatchGlobalState } from '../../state';

const BookingScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>BookingScreen</Text>
    <Button onPress={() => dispatchGlobalState({ type: 'logout' })}>
      logout
    </Button>
       
  </Layout>
);

export default BookingScreen
