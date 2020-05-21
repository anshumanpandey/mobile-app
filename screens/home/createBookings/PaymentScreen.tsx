import React from 'react'
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import { SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import useAxios from 'axios-hooks'
import axios from 'axios'
import base64 from 'react-native-base64'
import LoadingSpinner from '../../../partials/LoadingSpinner';

const GET_PAYPAL_JSON = (vehicle) => {
    return {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "transactions": [{
            "amount": {
                "total": vehicle.price,
                "currency": vehicle.currency || "USD",
            },
            "description": "This is the payment transaction description.",
            "custom": "EBAY_EMS_90048630024435",
            "invoice_number": "48787589673",
            "payment_options": {
                "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
            },
            "soft_descriptor": "ECHI5786786",
            "item_list": {
                "items": [{
                    "name": `Ride on ${vehicle.name}`,
                    "description": "A ride",
                    "quantity": "1",
                    "price": vehicle.price,
                    "tax": "0",
                    "sku": "1",
                    "currency": vehicle.currency || "USD"
                }],
            }
        }],
        "note_to_payer": "Contact us for any questions on your order.",
        "redirect_urls": {
            "return_url": "https://example.com",
            "cancel_url": "https://example.com"
        }
    }
};


export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    const basic = base64.encode(`AbBy2EJkKQpvu6zmf9gaySHsC5UK-mFjwqI_zLxaNCS60V4cIDU4mR7o5LsBtIU8KAjrh4yqdzsu3J_N:EOAfjk4-jQpSRODRe8FEPeg2X29H8fpW6XHxDjMt92kRYbz62xKDU02BIrLDSlfLFFpiFSyuj7BV8Tqw`)
    const [{ data, loading, error }, getAccessToken] = useAxios({
        url: `https://api.sandbox.paypal.com/v1/oauth2/token`,
        method: 'POST',
        params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${basic}`,
        },
    }, { manual: true })

    const [, doPayment] = useAxios({
        url: 'https://api.sandbox.paypal.com/v1/payments/payment',
        method: 'POST'
    }, { manual: true })

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: '5%', justifyContent: 'space-between', display: 'flex' }} keyboardShouldPersistTaps={"handled"} style={{ backgroundColor: 'white' }}>

                <Layout>
                    <Layout style={{ marginTop: '5%' }}>
                        <Layout>
                            <Text style={{ fontSize: 24, fontFamily: 'SF-UI-Display_Bold'}}>Payment</Text>
                            <Text>Choose desired vehicle type. We offer cars suitable for most every day needs.</Text>
                        </Layout>
                        <Button
                            onPress={async () => {
                                getAccessToken()
                                    .then(res => {

                                        return doPayment({
                                            headers: {
                                                'Authorization': `Bearer ${res.data.access_token}`
                                            },
                                            data: GET_PAYPAL_JSON(route.params.vehicle)
                                        })
                                    })
                                    .then((res) => {
                                        navigation.navigate('WebView', { url: res.data.links.find(i => i.method == 'REDIRECT').href})
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        if (err.response) {
                                            console.log(err.response.data);
                                        }
                                    })
                            }}
                            accessoryRight={loading ? LoadingSpinner : undefined}
                            size="giant" style={{
                                marginTop: '90%',
                                borderRadius: 10,
                                backgroundColor: '#41d5fb',
                                borderColor: '#41d5fb',
                                paddingLeft: 20,
                                paddingRight: 20,
                                marginBottom: '2%'
                            }}>
                            {() => <Text style={{ color: loading ? "#ACB1C0" : 'white', fontFamily: 'SF-UI-Display_Bold', fontSize: 18 }}>Pay with Paypal</Text>}
                        </Button>
                    </Layout>

                </Layout>
            </ScrollView >

        </SafeAreaView>
    )
};
