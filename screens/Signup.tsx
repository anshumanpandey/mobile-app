
import React, { useState } from 'react'
import { Layout, Text, Input, Button, Select, SelectItem } from '@ui-kitten/components';
import { TouchableWithoutFeedback, ImageProps } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { RenderProp } from '@ui-kitten/components/devsupport';
import PhoneInput from 'react-native-phone-input'
import { StackScreenProps } from '@react-navigation/stack';
import { NonLoginScreenProps } from '../types';


export default ({ navigation }: StackScreenProps<NonLoginScreenProps>) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderInputIcon: RenderProp<Partial<ImageProps>> = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon style={{ color: secureTextEntry ? '#e4e9f2' : 'black' }} name={secureTextEntry ? 'eye' : 'eye-slash'} size={30} />
        </TouchableWithoutFeedback>
    );

    return (
        <Layout style={{ flex: 1, padding: 10, overflow: 'scroll' }}>
            <Layout style={{ paddingBottom: 35 }}>
                <Text style={{ textAlign: 'left', fontSize: 25, marginBottom: 10 }} category='s2'>Create your account</Text>
                <Layout style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ color: 'black' }}>Already have an account? </Text>
                    <Text onPress={() => navigation.navigate('Login')} style={{ color: '#41d5fb' }}>Log in</Text>
                </Layout>
            </Layout>

            <Input
                style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: 10 }}
                size="large"
                label={() => <Text style={{ fontSize: 15, marginBottom: 10 }} category='s2'>Email</Text>}
                placeholder='Enter your email'
            />

            <Input
                style={{ backgroundColor: '#ffffff', borderRadius: 10 }}
                size="large"
                label={() => <Text style={{ fontSize: 15, marginBottom: 10 }} category='s2'>Password</Text>}
                placeholder='Enter your password'
                secureTextEntry={secureTextEntry}
                accessoryRight={renderInputIcon}
            />

            <Layout>
                <Text style={{ fontSize: 15, marginBottom: 10 }} category='s2'>Phone number</Text>
                <PhoneInput
                    style={{ borderWidth: 1, borderRadius: 10, borderColor: '#e5eaf2', padding: 15, marginBottom: 25 }}
                    textProps={{ placeholder: 'Mobile number' }}
                />
            </Layout>

            <Button size="giant" style={{
                backgroundColor: '#41d5fb',
                borderColor: '#41d5fb',
                marginBottom: 40,
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
                Sign up
            </Button>
            <Text style={{ textAlign: 'center', color: '#8f9bb5', marginBottom: 20 }} category='s2'>Or sign in with social account</Text>

            <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button size="small" accessoryLeft={() => <EntypoIcon style={{ color: '#ffffff' }} name="facebook-with-circle" size={22} />} style={{ borderRadius: 10, backgroundColor: '#3b5a99', borderColor: '#3b5a99', paddingLeft: 20, paddingRight: 20 }}>
                    Facebook
            </Button>

                <Button size="small" accessoryLeft={() => <EntypoIcon style={{ color: '#ffffff' }} name="twitter-with-circle" size={22} />} style={{ borderRadius: 10, backgroundColor: '#41d5fb', borderColor: '#41d5fb', paddingLeft: 20, paddingRight: 20 }}>
                    Twitter
            </Button>
            </Layout>

            <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 30, flexWrap: 'wrap' }}>
                <Text style={{ color: 'black' }}>By clicking "Sign Up" you agree to our</Text>
                <Text style={{ color: '#41d5fb' }}>terms and conditions </Text>
                <Text style={{ color: 'black' }}>as well as our </Text>
                <Text style={{ color: '#41d5fb' }}>privacy policy</Text>
            </Layout>
        </Layout>
    )
};
