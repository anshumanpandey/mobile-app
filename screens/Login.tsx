
import React, { useState, useRef, useEffect } from 'react'
import { Layout, Text, Input, Button, Popover } from '@ui-kitten/components';
import { TouchableWithoutFeedback, ImageProps, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RenderProp } from '@ui-kitten/components/devsupport';
import useAxios from 'axios-hooks'
import { Formik } from 'formik';
import { GRCGDS_BACKEND } from 'react-native-dotenv'
import { dispatchGlobalState } from '../state';
import { StackScreenProps } from '@react-navigation/stack';
import { NonLoginScreenProps, LoginScreenProps } from '../types';
import LoadingSpinner from '../partials/LoadingSpinner';
import FacebookButton from '../partials/FacebookButton';
import TwitterButton from '../partials/TwitterButton';
import ErrorLabel from '../partials/ErrorLabel';


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
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView keyboardShouldPersistTaps={"handled"} >

            <Layout style={{ flex: 1, padding: '3%' }}>
                <Layout style={{ paddingBottom: '10%' }}>
                    <Text style={{ textAlign: 'left', fontSize: 24, marginBottom: 10, fontFamily: 'SF-UI-Display_Bold' }} category='s2'>Welcome back, Guy!</Text>
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
                    initialValues={{ clientname: '', password: '' }}
                    validate={(values) => {
                        const errors: { clientname?: string, password?: string } = {};
                        if (!values.clientname) {
                            errors.clientname = 'Required';
                        }

                        if (!values.password) {
                            errors.password = 'Required';
                        }

                        return errors

                    }}
                    onSubmit={values => {
                        if (!values.clientname) return
                        if (!values.password) return
                        const data = {
                            clientname: values.clientname,
                            password: values.password
                        }
                        doLogin({ data })
                            .then((res) => {
                                dispatchGlobalState({ type: 'token', state: res.data.token })
                                dispatchGlobalState({ type: 'profile', state: res.data })
                                navigation.navigate('Home')
                            })
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
                        return (
                            <>
                                <Input
                                    status={errors.clientname && touched.clientname ? 'danger' : undefined}
                                    value={values.clientname}
                                    onChangeText={handleChange('clientname')}
                                    style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: '3%' }}
                                    size="large"
                                    label={() => <Text style={{ fontSize: 15, marginBottom: '5%' }} category='s2'>Email</Text>}
                                    placeholder='Enter your email'
                                    caption={errors.clientname && touched.clientname ? () => <ErrorLabel text={errors.clientname} /> : undefined}

                                />

                                <Input
                                    status={errors.password && touched.password ? 'danger' : undefined}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: '3%' }}
                                    size="large"
                                    label={() => <Text style={{ fontSize: 15, marginBottom: '5%' }} category='s2'>Password</Text>}
                                    placeholder='Enter your password'
                                    secureTextEntry={secureTextEntry}
                                    accessoryRight={renderInputIcon}
                                    caption={errors.password && touched.password ? () => <ErrorLabel text={errors.password} /> : undefined}
                                />
                                <Text onPress={() => navigation.navigate("ForgotPassword")} style={{ fontSize: 15, textAlign: 'right', color: '#70dffb', marginBottom: '6%' }} category='s2'> Forgot your password? </Text>
                                <Button
                                    accessoryRight={loading ? LoadingSpinner : undefined}
                                    disabled={loading}
                                    onPress={(e) => { handleSubmit() }}
                                    size="giant"
                                    style={{
                                        backgroundColor: loading == false ? '#41d5fb' : '#e4e9f2',
                                        borderColor: loading == false ? '#41d5fb' : '#e4e9f2',
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
                                    {() => <Text style={{ fontFamily: 'SF-UI-Display_Bold',color: loading ? "#ACB1C0" : 'white', fontSize: 18}}>Sign in</Text>}
                            </Button>
                            </>
                        )
                    }}
                </Formik>

                <Text style={{ textAlign: 'center', color: '#8f9bb5', marginBottom: '5%' }} category='s2'>Or sign in with social account</Text>

                <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <FacebookButton />

                    <TwitterButton />
                </Layout>

                <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10%' }}>
                    <Text style={{ color: 'black' }}> Don't have an account? </Text>
                    <Text onPress={() => navigation.navigate('Signup')} style={{ color: '#41d5fb' }}>Sign up</Text>
                </Layout>
            </Layout>
            </ScrollView>

        </SafeAreaView>
    )
};
