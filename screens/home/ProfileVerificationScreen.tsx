
import React from 'react'
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import { SafeAreaView, ScrollView } from 'react-native';
import useAxios from 'axios-hooks'
import { Formik } from 'formik';
import { GRCGDS_BACKEND } from 'react-native-dotenv'
import { dispatchGlobalState, useGlobalState } from '../../state';
import { StackScreenProps } from '@react-navigation/stack';
import { NonLoginScreenProps, LoginScreenProps } from '../../types';
import LoadingSpinner from '../../partials/LoadingSpinner';
import ErrorLabel from '../../partials/ErrorLabel';
import PhoneInputComponent from '../../partials/PhoneInput';
import BackButton from '../../partials/BackButton';
import CountryPicker from 'react-native-country-picker-modal'
import userHasFullProfile from '../../utils/userHasFullProfile';
import userHasAllFiles from '../../utils/userHasAllFiles';
import { FileTypeEnum } from './DocumentUpload/DocumentState';
import userIsCompany from '../../utils/userIsCompany';


export default ({ navigation }: StackScreenProps<NonLoginScreenProps & LoginScreenProps>) => {
    const [{ data, loading, error }, doLogin] = useAxios({
        url: `${GRCGDS_BACKEND}`,
        method: 'POST'
    }, { manual: true })

    const [profile] = useGlobalState('profile')
    const hasFullProfile = userHasFullProfile(profile || {})
    const hasAllFiles = userHasAllFiles(profile || {})

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView keyboardShouldPersistTaps={"handled"} >

                <Layout style={{ flex: 1, padding: '3%' }}>

                    <Layout style={{ paddingBottom: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                        {navigation.canGoBack() && (
                            <Layout style={{ paddingRight: '3%' }}>
                                <BackButton />
                            </Layout>
                        )}
                        <Text style={{ textAlign: 'left', fontSize: 24, fontFamily: 'SF-UI-Display_Bold' }} category='s2'>
                            Profile
                        </Text>
                    </Layout>

                    <Formik
                        initialValues={{
                            emailaddress: '',
                            mobilenumber: '',
                            firstname: '',
                            lastname: '',
                            mobilecode: '+1',
                            add1: '',
                            add2: '',
                            city: '',
                            postcode: '',
                            countryCode: profile?.country ? profile.country : '',
                            company: '',
                            vat: '',
                            ...profile
                        }}
                        enableReinitialize
                        validate={(values) => {
                            const errors: { mobilenumber?: string, mobilecode?: string, tele?: string, company?: string, vat?: string } = {};
                            if (!values.mobilenumber) errors.mobilenumber = 'Required';
                            if (!values.mobilecode) errors.mobilecode = 'Required';

                            if (userIsCompany(profile || {})) {
                                if (!values.company) errors.company = 'Required';
                                if (!values.vat) errors.vat = 'Required';
                            }

                            return errors

                        }}
                        onSubmit={values => {
                            doLogin({ data: { ...values, module_name: "EDIT_PROFILE" } })
                                .then((res) => {
                                    dispatchGlobalState({ type: 'token', state: res.data.token })
                                    dispatchGlobalState({ type: 'profile', state: res.data })
                                })
                                .catch(err => console.log(err))
                        }}
                    >
                        {({ handleChange, setFieldValue, handleSubmit, values, errors, touched }) => {
                            return (
                                <>
                                    <Input
                                        status={errors.emailaddress && touched.emailaddress ? 'danger' : undefined}
                                        value={values.emailaddress}
                                        onChangeText={handleChange('emailaddress')}
                                        style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: '3%' }}
                                        size="large"
                                        label={() => <Text style={{ fontSize: 15, marginBottom: '5%' }} category='s2'>Email</Text>}
                                        placeholder='Enter your email'
                                        caption={errors.emailaddress && touched.emailaddress ? () => <ErrorLabel text={errors.emailaddress} /> : undefined}

                                    />

                                    <Layout style={{ marginBottom: '3%' }}>
                                        <Text style={{ fontSize: 15, marginBottom: '2%' }} category='s2'>Phone number</Text>
                                        <PhoneInputComponent
                                            styles={{ borderColor: errors.mobilenumber && touched.mobilenumber ? '#ffa5bc' : '#e5eaf2', }}
                                            mobilecode={values.mobilecode}
                                            mobileNumber={values.mobilenumber}
                                            onCountryChanged={(countryCode) => {
                                            }}
                                            onCodeChange={(code) => {
                                                setFieldValue('mobilecode', code)
                                            }}
                                            onNumberChange={(number) => {
                                                handleChange('mobilenumber')(number)
                                            }}
                                        />
                                        {errors.mobilenumber && touched.mobilenumber && <ErrorLabel text={errors.mobilenumber} />}
                                    </Layout>

                                    <Layout style={{ marginBottom: '3%' }}>
                                        <Text style={{ fontSize: 15, marginBottom: '2%' }} category='s2'>Country</Text>
                                        <CountryPicker
                                            containerButtonStyle={{ borderWidth: 1, borderColor: '#E4E9F2', padding: '2%', borderRadius: 10 }}
                                            countryCode={values.countryCode.toUpperCase()}
                                            withFilter={true}
                                            withFlagButton={true}
                                            withCountryNameButton={true}
                                            onSelect={(country) => {
                                                setFieldValue('countryCode', country.cca2.toLowerCase())
                                            }}
                                        />
                                    </Layout>

                                    <Input
                                        status={errors.firstname && touched.firstname ? 'danger' : undefined}
                                        value={values.firstname}
                                        onChangeText={handleChange('firstname')}
                                        style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: '3%' }}
                                        size="large"
                                        label={() => <Text style={{ fontSize: 15, marginBottom: '5%' }} category='s2'>First Name</Text>}
                                        placeholder='Enter First Name'
                                        caption={errors.firstname && touched.firstname ? () => <ErrorLabel text={errors.firstname} /> : undefined}
                                    />

                                    <Input
                                        status={errors.lastname && touched.lastname ? 'danger' : undefined}
                                        value={values.lastname}
                                        onChangeText={handleChange('lastname')}
                                        style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: '3%' }}
                                        size="large"
                                        label={() => <Text style={{ fontSize: 15, marginBottom: '5%' }} category='s2'>Last Name</Text>}
                                        placeholder='Enter your last name'
                                        caption={errors.lastname && touched.lastname ? () => <ErrorLabel text={errors.lastname} /> : undefined}
                                    />

                                    <Input
                                        status={errors.add1 && touched.add1 ? 'danger' : undefined}
                                        value={values.add1}
                                        onChangeText={handleChange('add1')}
                                        style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: '3%' }}
                                        size="large"
                                        label={() => <Text style={{ fontSize: 15, marginBottom: '5%' }} category='s2'>Address 1</Text>}
                                        placeholder='Enter your address'
                                        caption={errors.add1 && touched.add1 ? () => <ErrorLabel text={errors.add1} /> : undefined}
                                    />

                                    <Input
                                        status={errors.add2 && touched.add2 ? 'danger' : undefined}
                                        value={values.add2}
                                        onChangeText={handleChange('add2')}
                                        style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: '3%' }}
                                        size="large"
                                        label={() => <Text style={{ fontSize: 15, marginBottom: '5%' }} category='s2'>Address 2</Text>}
                                        placeholder='Enter your address'
                                        caption={errors.add2 && touched.add2 ? () => <ErrorLabel text={errors.add2} /> : undefined}
                                    />

                                    <Input
                                        status={errors.city && touched.city ? 'danger' : undefined}
                                        value={values.city}
                                        onChangeText={handleChange('city')}
                                        style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: '3%' }}
                                        size="large"
                                        label={() => <Text style={{ fontSize: 15, marginBottom: '5%' }} category='s2'>City</Text>}
                                        placeholder='Enter your address'
                                        caption={errors.city && touched.city ? () => <ErrorLabel text={errors.city} /> : undefined}
                                    />

                                    <Input
                                        status={errors.postcode && touched.postcode ? 'danger' : undefined}
                                        value={values.postcode}
                                        onChangeText={handleChange('postcode')}
                                        style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: '3%' }}
                                        size="large"
                                        label={() => <Text style={{ fontSize: 15, marginBottom: '5%' }} category='s2'>Postcode</Text>}
                                        placeholder='Enter your address'
                                        caption={errors.postcode && touched.postcode ? () => <ErrorLabel text={errors.postcode} /> : undefined}
                                    />

                                    {userIsCompany(profile || {}) && (
                                        <>
                                            <Input
                                                status={errors.company && touched.company ? 'danger' : undefined}
                                                value={values.company}
                                                onChangeText={handleChange('company')}
                                                style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: '3%' }}
                                                size="large"
                                                label={() => <Text style={{ fontSize: 15, marginBottom: '5%' }} category='s2'>Company Name</Text>}
                                                placeholder='Enter your address'
                                                caption={errors.company && touched.company ? () => <ErrorLabel text={errors.company} /> : undefined}
                                            /><Input
                                                status={errors.vat && touched.vat ? 'danger' : undefined}
                                                value={values.vat}
                                                onChangeText={handleChange('vat')}
                                                style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: '3%' }}
                                                size="large"
                                                label={() => <Text style={{ fontSize: 15, marginBottom: '5%' }} category='s2'>Company VAT Number</Text>}
                                                placeholder='Enter your address'
                                                caption={errors.vat && touched.vat ? () => <ErrorLabel text={errors.vat} /> : undefined}
                                            />
                                        </>
                                    )}

                                    <Button
                                        accessoryRight={loading ? LoadingSpinner : undefined}
                                        disabled={loading}
                                        onPress={(e) => {
                                            if (hasFullProfile && !hasAllFiles) {
                                                navigation.navigate("SingleUpload", {
                                                    fileType: FileTypeEnum.passport
                                                });
                                            } else {
                                                handleSubmit()
                                            }
                                        }}
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
                                        {() => {
                                            return <Text style={{ fontFamily: 'SF-UI-Display_Bold', color: loading ? "#ACB1C0" : 'white', fontSize: 18 }}>
                                                {hasFullProfile && !hasAllFiles ? "Next" : 'Save'}
                                            </Text>
                                        }}
                                    </Button>
                                </>
                            )
                        }}
                    </Formik>
                </Layout>
            </ScrollView>

        </SafeAreaView>
    )
};