
import React, { useState, useRef } from 'react'
import { Layout, Text, Input, Button, Toggle } from '@ui-kitten/components';
import { TouchableWithoutFeedback, ImageProps, ScrollView, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { RenderProp } from '@ui-kitten/components/devsupport';
import PhoneInput from 'react-native-phone-input'
import { TextInput } from 'react-native-gesture-handler';
import ReactNativePhoneInput from 'react-native-phone-input';
import ErrorLabel from '../partials/ErrorLabel';
import { GRCGDS_BACKEND } from 'react-native-dotenv'
import useAxios from 'axios-hooks'
import LoadingSpinner from '../partials/LoadingSpinner';
import { dispatchGlobalState } from '../state';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../partials/BackButton';
import FacebookButton from '../partials/FacebookButton';
import TwitterButton from '../partials/TwitterButton';
import { LoginManager, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import { handlePermissionPromt, handleUserData } from '../utils/FacebookAuth';


export default () => {
    const navigation = useNavigation();

    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [phonenumberToShow, setPhonenumberToShow] = useState<string>('');
    const [countryCode, setCountryCode] = useState<string>(`+1`);
    const [asCompany, setAsCompany] = useState(false);
    const phoneInput = useRef<ReactNativePhoneInput<typeof TextInput> | null>(null);
    const [{ data, loading, error }, doRegister] = useAxios({
        url: `${GRCGDS_BACKEND}/user/register`,
        method: 'POST'
    }, { manual: true })

    const [loginReq, doLogin] = useAxios({
        url: `${GRCGDS_BACKEND}/user/login`,
        method: 'POST'
    }, { manual: true })


    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderInputIcon: RenderProp<Partial<ImageProps>> = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon style={{ color: secureTextEntry ? '#e4e9f2' : 'black' }} name={secureTextEntry ? 'eye' : 'eye-slash'} size={30} />
        </TouchableWithoutFeedback>
    );

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ScrollView keyboardShouldPersistTaps={"handled"} >
                <Layout style={{ flex: 1, paddingLeft: '3%', paddingTop: '3%', paddingBottom: '2%' }}>
                    <BackButton />
                </Layout>
                <Layout style={{ flex: 1, paddingLeft: '3%', paddingRight: '3%', paddingBottom: '3%' }}>
                    <Layout style={{ paddingBottom: '5%' }}>
                        <Text style={{ textAlign: 'left', fontSize: 25, marginBottom: '3%', fontFamily: 'SF-UI-Display_Bold' }} category='s2'>Create your account</Text>
                        <Layout style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={{ color: 'black' }}>Already have an account? </Text>
                            <Text onPress={() => navigation.navigate('Login')} style={{ color: '#41d5fb' }}>Log in</Text>
                        </Layout>
                    </Layout>

                    <Formik
                        initialValues={{ emailaddress: '', password: '', tele: '', confirmPassword: '', companyName: '', companyVatNumber: '' }}
                        validate={(values) => {
                            const errors: { emailaddress?: string, password?: string, tele?: string } = {};
                            if (!values.emailaddress) {
                                errors.emailaddress = 'Required';
                            }

                            if (!values.password) {
                                errors.password = 'Required';
                            }

                            if (!values.tele) {
                                errors.tele = 'Required';
                            }

                            return errors

                        }}
                        onSubmit={values => {

                            const data = values
                            data.username = values.emailaddress
                            data.module_name = "REGISTER"

                            doRegister({ data: { ...data, asCompany } })
                                .then((res) => {
                                    const data = {
                                        username: values.emailaddress,
                                        password: values.password
                                    }
                                    return doLogin({ data })
                                })
                                .then(res => {
                                    dispatchGlobalState({ type: 'token', state: res.data.token })
                                    dispatchGlobalState({ type: 'profile', state: res.data })
                                    navigation.navigate('Home', { screen: 'EnableOpt' })
                                })

                        }}
                    >
                        {({ handleChange, touched, handleSubmit, values, errors }) => {
                            return (
                                <>
                                    <Input
                                        status={errors.emailaddress && touched.emailaddress ? 'danger' : undefined}
                                        style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: '3%' }}
                                        size="large"
                                        label={() => <Text style={{ fontSize: 15, marginBottom: '2%' }} category='s2'>Email</Text>}
                                        placeholder='Enter your email'
                                        value={values.emailaddress}
                                        onChangeText={handleChange('emailaddress')}
                                        caption={errors.emailaddress && touched.emailaddress ? () => <ErrorLabel text={errors.emailaddress} /> : undefined}
                                    />


                                    <Input
                                        status={errors.password && touched.password ? 'danger' : undefined}
                                        style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: '3%' }}
                                        size="large"
                                        label={() => <Text style={{ fontSize: 15, marginBottom: '2%' }} category='s2'>Password</Text>}
                                        placeholder='Enter your password'
                                        secureTextEntry={secureTextEntry}
                                        accessoryRight={renderInputIcon}
                                        value={values.password}
                                        onChangeText={(e) => {
                                            handleChange('password')(e)
                                            handleChange('confirmPassword')(e)
                                        }}
                                        caption={errors.password && touched.password ? () => <ErrorLabel text={errors.password} /> : undefined}
                                    />

                                    <Layout style={{ marginBottom: '3%' }}>
                                        <Text style={{ fontSize: 15, marginBottom: '2%' }} category='s2'>Phone number</Text>
                                        <PhoneInput
                                            initialCountry="us"
                                            style={{ borderColor: errors.tele && touched.tele ? '#ffa5bc' : '#e5eaf2', borderWidth: 1, borderRadius: 10, padding: 15 }}
                                            textProps={{
                                                placeholder: 'Mobile number',
                                                value: `${countryCode} ${phonenumberToShow}`,
                                                onChangeText: (c: string) => {
                                                    const currentValue = c.replace(' ', '')
                                                    (currentValue)
                                                    handleChange('tele')(currentValue)
                                                    setPhonenumberToShow(p => {
                                                        const number = c.toString().split(' ')[1]
                                                        return number || ''
                                                    })
                                                    return null
                                                }
                                            }}
                                            ref={ref => {
                                                phoneInput.current = ref;
                                            }}
                                            onSelectCountry={(c) => {
                                                setCountryCode(`+${phoneInput.current?.getCountryCode()}` || '+1')
                                            }}
                                        />
                                        {errors.tele && touched.tele && <ErrorLabel text={errors.tele} />}
                                    </Layout>

                                    <Toggle checked={asCompany} onChange={() => setAsCompany(p => !p)}>
                                        Register as Company
                            </Toggle>

                                    {asCompany && (
                                        <Layout>
                                            <Input
                                                status={errors.companyName && touched.companyName ? 'danger' : undefined}
                                                style={{ backgroundColor: '#ffffff', borderRadius: 10, marginTop: '3%', marginBottom: '3%' }}
                                                size="large"
                                                label={() => <Text style={{ fontSize: 15, marginBottom: '2%' }} category='s2'>Company Name</Text>}
                                                placeholder='Enter your company name'
                                                value={values.companyName}
                                                onChangeText={handleChange('companyName')}
                                                caption={errors.companyName && touched.companyName ? () => <ErrorLabel text={errors.companyName} /> : undefined}
                                            />
                                            <Input
                                                status={errors.companyVatNumber && touched.companyVatNumber ? 'danger' : undefined}
                                                style={{ backgroundColor: '#ffffff', borderRadius: 10 }}
                                                size="large"
                                                label={() => <Text style={{ fontSize: 15, marginBottom: '2%' }} category='s2'>Company VAT Number</Text>}
                                                placeholder='Enter your company VAT number'
                                                value={values.companyVatNumber}
                                                onChangeText={handleChange('companyVatNumber')}
                                                caption={errors.companyVatNumber && touched.companyVatNumber ? () => <ErrorLabel text={errors.companyVatNumber} /> : undefined}
                                            />
                                        </Layout>
                                    )}

                                    <Button
                                        disabled={loading == true || loginReq.loading == true}
                                        accessoryRight={loading ? LoadingSpinner : undefined}
                                        onPress={(e) => { handleSubmit() }}
                                        size="giant"
                                        style={{
                                            marginTop: '10%',
                                            backgroundColor: loading == false ? '#41d5fb' : '#e4e9f2',
                                            borderColor: loading == false ? '#41d5fb' : '#e4e9f2',
                                            marginBottom: '10%',
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
                                        {() => <Text style={{ fontFamily: 'SF-UI-Display_Bold', color: loading ? "#ACB1C0" : 'white', fontSize: 18 }}>Sign up</Text>}
                                    </Button>
                                </>
                            );
                        }}
                    </Formik>

                    <Text style={{ textAlign: 'center', color: '#8f9bb5', marginBottom: '5%' }} category='s2'>Or sign up with social media</Text>

                    <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <FacebookButton onPress={() => {
                            LoginManager.logInWithPermissions(["public_profile", "email"])
                                .then(handlePermissionPromt)
                                .then(handleUserData)
                                .then(() => navigation.navigate('Home'))
                                .catch((error) => console.log("Login fail with error: " + error))
                        }} />

                        <TwitterButton />
                    </Layout>

                    <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '5%', flexWrap: 'wrap' }}>
                        <Text style={{ color: 'black' }}>By clicking "Sign Up" you agree to our</Text>
                        <Text style={{ color: '#41d5fb' }}>terms and conditions </Text>
                        <Text style={{ color: 'black' }}>as well as our </Text>
                        <Text style={{ color: '#41d5fb' }}>privacy policy</Text>
                    </Layout>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    )
};
