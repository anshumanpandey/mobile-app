
import React, { useState, useRef, useEffect } from 'react'
import { Layout, Text, Input, Button, Popover } from '@ui-kitten/components';
import { TouchableWithoutFeedback, ImageProps } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { RenderProp } from '@ui-kitten/components/devsupport';
import useAxios from 'axios-hooks'
import { Formik } from 'formik';
import { GRCGDS_BACKEND } from 'react-native-dotenv'
import { dispatchGlobalState } from '../state';
import { StackScreenProps } from '@react-navigation/stack';
import { NonLoginScreenProps, LoginScreenProps } from '../types';
import LoadingSpinner from '../partials/LoadingSpinner';


export default ({ navigation }: StackScreenProps<NonLoginScreenProps & LoginScreenProps>) => {
    const [{ data, loading, error }, doLogin] = useAxios({
        url: `${GRCGDS_BACKEND}/public/login`,
        method: 'POST'
    }, { manual: true })

    const [displayError, setDisplayError] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderInputIcon: RenderProp<Partial<ImageProps>> = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon style={{ color: secureTextEntry ? '#e4e9f2' : 'black' }} name={secureTextEntry ? 'eye' : 'eye-slash'} size={30} />
        </TouchableWithoutFeedback>
    );

    useEffect(() => {
        if (error) setDisplayError(true)
    }, [loading]);

    return (
        <Layout style={{ flex: 1, padding: '3%' }}>
            <Layout style={{ paddingBottom: '10%' }}>
                <Text style={{ textAlign: 'left', fontSize: 25, marginBottom: 10 }} category='s2'>Welcome back, Guy!</Text>
                <Text style={{ textAlign: 'left', fontSize: 15, color: '#8f9bb5' }} category='s2'>Sign in to your account</Text>
            </Layout>

            {displayError && (
                <Popover
                    backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    anchor={renderInputIcon}
                    visible={displayError}
                    onBackdropPress={() => setDisplayError(false)}>
                    <Layout >
                        <Text>
                            {error?.response?.data.error}
                        </Text>
                    </Layout>
                </Popover>
            )}

            <Formik
                initialValues={{ clientname: 'bookingclik', password: 'bookingclik' }}
                onSubmit={values => {
                    if (!values.clientname) return
                    if (!values.password) return
                    const data = {
                        clientname: values.clientname,
                        password: values.password
                    }
                    doLogin({ data })
                    .then((res) => {
                        dispatchGlobalState({ type: 'token', state: res.data.token})
                        dispatchGlobalState({ type: 'profile', state: res.data})
                        navigation.navigate('Home')
                    })
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => {
                    return (
                        <>
                            <Input
                                value={values.clientname}
                                onChangeText={handleChange('clientname')}
                                style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: '3%' }}
                                size="large"
                                label={() => <Text style={{ fontSize: 15, marginBottom: '5%' }} category='s2'>Email</Text>}
                                placeholder='Enter your email'
                            />

                            <Input
                                value={values.password}
                                onChangeText={handleChange('password')}
                                style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: '3%' }}
                                size="large"
                                label={() => <Text style={{ fontSize: 15, marginBottom: '5%' }} category='s2'>Password</Text>}
                                placeholder='Enter your password'
                                secureTextEntry={secureTextEntry}
                                accessoryRight={renderInputIcon}
                            />
                            <Text style={{ fontSize: 15, textAlign: 'right', color: '#70dffb', marginBottom: '6%' }} category='s2'> Forgot your password? </Text>
                            <Button
                                accessoryRight={loading ? LoadingSpinner : undefined}
                                disabled={loading}
                                onPress={(e) => { handleSubmit() }}
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
                                Sign in
                            </Button>
                        </>
                    )
                }}
            </Formik>

            <Text style={{ textAlign: 'center', color: '#8f9bb5', marginBottom: '5%' }} category='s2'>Or sign in with social account</Text>

            <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button size="small" accessoryLeft={() => <EntypoIcon style={{ color: '#ffffff' }} name="facebook-with-circle" size={22} />} style={{ borderRadius: 10, backgroundColor: '#3b5a99', borderColor: '#3b5a99', paddingLeft: 20, paddingRight: 20 }}>
                    Facebook
            </Button>

                <Button size="small" accessoryLeft={() => <EntypoIcon style={{ color: '#ffffff' }} name="twitter-with-circle" size={22} />} style={{ borderRadius: 10, backgroundColor: '#41d5fb', borderColor: '#41d5fb', paddingLeft: 20, paddingRight: 20 }}>
                    Twitter
            </Button>
            </Layout>

            <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10%' }}>
                <Text style={{ color: 'black' }}> Don't have an account? </Text>
                <Text onPress={() => navigation.navigate('Signup')} style={{ color: '#41d5fb' }}>Sign up</Text>
            </Layout>
        </Layout>
    )
};
