
import React, { useState, useRef, useEffect } from 'react'
import { Layout, Text, Input, Button, Popover } from '@ui-kitten/components';
import { TouchableWithoutFeedback, ImageProps } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { RenderProp } from '@ui-kitten/components/devsupport';
import useAxios from 'axios-hooks'
import { Formik } from 'formik';
import { GRCGDS_BACKEND } from 'react-native-dotenv'
import { dispatchGlobalState, useGlobalState } from '../state';
import { StackScreenProps } from '@react-navigation/stack';
import { ScreenProps } from '../types';


export default ({ navigation }: StackScreenProps<ScreenProps>) => {
    const [profile] = useGlobalState('profile')

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category='h1'>Welcome {profile?.client.clientname}</Text>
            <Button
                onPress={(e) => { dispatchGlobalState({ type: 'logout'}) }}
                size="giant"
                style={{
                    backgroundColor: '#41d5fb',
                    borderColor: '#41d5fb',
                    marginBottom: 45,
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
                Logout
                            </Button>
        </Layout>
    )
};
