
import React, { useState, useRef, useEffect } from 'react'
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import { TouchableWithoutFeedback, ImageProps, SafeAreaView, ScrollView, NativeModules, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RenderProp } from '@ui-kitten/components/devsupport';
import useAxios from 'axios-hooks'
import { Formik } from 'formik';
import { GRCGDS_BACKEND } from 'react-native-dotenv'
import { dispatchGlobalState, useGlobalState } from '../../state';
import { StackScreenProps } from '@react-navigation/stack';
import { NonLoginScreenProps, LoginScreenProps } from '../../types';
import LoadingSpinner from '../../partials/LoadingSpinner';
import ErrorLabel from '../../partials/ErrorLabel';
import PhoneInput from 'react-native-phone-input'
import ReactNativePhoneInput from 'react-native-phone-input';


export default ({ navigation }: StackScreenProps<NonLoginScreenProps & LoginScreenProps>) => {
    const [{ data, loading, error }, doLogin] = useAxios({
        url: `${GRCGDS_BACKEND}`,
        method: 'POST'
    }, { manual: true })

    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [profile] = useGlobalState('profile')
    const phoneInput = useRef<ReactNativePhoneInput<typeof TextInput> | null>(null);
    const [phonenumberToShow, setPhonenumberToShow] = useState<string>(profile.mobilenumber);

    console.log(profile)

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    useEffect(() => {
        if (!phoneInput.current) return
        const code = phoneInput.current.getAllCountries().find(obj => {
            const countryDialCode = obj.dialCode
            const copy = profile.mobilecode.toString()
            return copy.replace("+","") == countryDialCode;
        })
        console.log()
        phoneInput.current.selectCountry(code ? code.iso2 : 'us')
    },[phoneInput.current])

    const renderInputIcon: RenderProp<Partial<ImageProps>> = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon style={{ color: secureTextEntry ? '#e4e9f2' : 'black' }} name={secureTextEntry ? 'eye' : 'eye-slash'} size={30} />
        </TouchableWithoutFeedback>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView keyboardShouldPersistTaps={"handled"} >

                <Layout style={{ flex: 1, padding: '3%' }}>
                    <Layout style={{ paddingBottom: '10%' }}>
                        <Text style={{ textAlign: 'left', fontSize: 24, marginBottom: 10, fontFamily: 'SF-UI-Display_Bold' }} category='s2'>
                            Edit your profile
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
                            ...profile
                        }}
                        enableReinitialize
                        onSubmit={values => {
                            console.log(values)
                            doLogin({ data: { ...values, module_name: "EDIT_PROFILE" } })
                                .then((res) => {
                                    console.log('then')
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
                                        <PhoneInput
                                            style={{ borderColor: errors.mobilenumber && touched.mobilenumber ? '#ffa5bc' : '#e5eaf2', borderWidth: 1, borderRadius: 10, padding: 15 }}
                                            textProps={{
                                                placeholder: 'Mobile number',
                                                value: `${values.mobilecode} ${phonenumberToShow}`,
                                                onChangeText: (c: string) => {
                                                    setPhonenumberToShow(p => {
                                                        const number = c.toString().replace(values.mobilecode, "").replace(" ", "")
                                                        const rawNumber = (number || '').replace('+','')

                                                        handleChange('mobilenumber')(rawNumber)
                                                        return rawNumber
                                                    })
                                                    return null
                                                }
                                            }}
                                            ref={ref => {
                                                phoneInput.current = ref;
                                            }}
                                            onSelectCountry={(c) => {
                                                if (!phoneInput.current?.getCountryCode()) return
                                                setFieldValue('mobilecode', `+${phoneInput.current?.getCountryCode()}` || '+1')
                                            }}
                                        />
                                        {errors.mobilenumber && touched.mobilenumber && <ErrorLabel text={errors.mobilenumber} />}
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
                                        label={() => <Text style={{ fontSize: 15, marginBottom: '5%' }} category='s2'>Second Name</Text>}
                                        placeholder='Enter your second name'
                                        caption={errors.lastname && touched.lastname ? () => <ErrorLabel text={errors.lastname} /> : undefined}
                                    />

                                    <Input
                                        status={errors.add1 && touched.add1 ? 'danger' : undefined}
                                        value={values.add1}
                                        onChangeText={handleChange('add1')}
                                        style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: '3%' }}
                                        size="large"
                                        label={() => <Text style={{ fontSize: 15, marginBottom: '5%' }} category='s2'>Address</Text>}
                                        placeholder='Enter your address'
                                        caption={errors.add1 && touched.add1 ? () => <ErrorLabel text={errors.add1} /> : undefined}
                                    />

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
                                        {() => <Text style={{ fontFamily: 'SF-UI-Display_Bold', color: loading ? "#ACB1C0" : 'white', fontSize: 18 }}>Save</Text>}
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
