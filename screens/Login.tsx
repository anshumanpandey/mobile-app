
import React, { useState } from 'react'
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import { TouchableWithoutFeedback, ImageProps } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { RenderProp } from '@ui-kitten/components/devsupport';


export default () => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderInputIcon: RenderProp<Partial<ImageProps>> = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon style={{ color: secureTextEntry ? '#e4e9f2' :'black'}} name={secureTextEntry ? 'eye' : 'eye-slash'} size={30} />
        </TouchableWithoutFeedback>
    );

    return (
        <Layout style={{ flex: 1, padding: 10 }}>
            <Layout style={{ paddingBottom: 45 }}>
                <Text style={{ textAlign: 'left', fontSize: 25, marginBottom: 10 }} category='s2'>Welcome back, Guy!</Text>
                <Text style={{ textAlign: 'left', fontSize: 15, color: '#8f9bb5' }} category='s2'>Sign in to your account</Text>
            </Layout>

            <Input
                style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: 20 }}
                size="large"
                label={() => <Text style={{ fontSize: 15, marginBottom: 10 }} category='s2'>Email</Text>}
                placeholder='Enter your email'
            />

            <Input
                style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: 30 }}
                size="large"
                label={() => <Text style={{ fontSize: 15, marginBottom: 10 }} category='s2'>Password</Text>}
                placeholder='Enter your password'
                secureTextEntry={secureTextEntry}
                accessoryRight={renderInputIcon}
            />

            <Text style={{ fontSize: 15, textAlign: 'right', color: '#70dffb', marginBottom: 30 }} category='s2'> Forgot your password? </Text>
            <Button size="giant" style={{
                backgroundColor: '#41d5fb',
                borderColor: '#41d5fb',
                marginBottom: 60,
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
            <Text style={{ textAlign: 'center', color: '#8f9bb5', marginBottom: 20 }} category='s2'>Or sign in with social account</Text>

            <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button size="small" accessoryLeft={() => <EntypoIcon style={{ color: '#ffffff' }} name="facebook-with-circle" size={22} />} style={{ borderRadius: 10, backgroundColor: '#3b5a99', borderColor: '#3b5a99', paddingLeft: 20, paddingRight: 20 }}>
                    Facebook
            </Button>

                <Button size="small" accessoryLeft={() => <EntypoIcon style={{ color: '#ffffff' }} name="twitter-with-circle" size={22} />} style={{ borderRadius: 10, backgroundColor: '#41d5fb', borderColor: '#41d5fb', paddingLeft: 20, paddingRight: 20 }}>
                    Twitter
            </Button>
            </Layout>

            <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
                <Text style={{ color: 'black' }}> Don't have an account? </Text>
                <Text style={{ color: '#41d5fb' }}>Sign up</Text>
            </Layout>
        </Layout>
    )
};
