import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';
import { dispatchGlobalState } from '../../state';

const DocumentScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category='h1'>DocumentScreen</Text>
    <Button onPress={() => dispatchGlobalState({ type: 'logout' })}>
      logout
    </Button>
  </Layout>
);

export default DocumentScreen