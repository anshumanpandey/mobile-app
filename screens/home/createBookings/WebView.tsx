import React, { useState, useRef, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { useRoute, useNavigation, CommonActions } from '@react-navigation/native';
import useAxios from 'axios-hooks'
import { GRCGDS_BACKEND } from 'react-native-dotenv'
import { useCreateBookingState } from './CreateBookingState';
import moment from 'moment';
import { dispatchGlobalState } from '../../../state';

const WebViewScreen = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const webview = useRef<WebView | null>(null)

    const [departureTime] = useCreateBookingState("departureTime");
    const [returnTime] = useCreateBookingState("returnTime");
    const [originLocation] = useCreateBookingState("originLocation");
    const [, setArrivalTime] = useCreateBookingState("arrivalTime");
    const [returnLocation] = useCreateBookingState("returnLocation");

    const [extras] = useCreateBookingState("extras");
    const [vehicle] = useCreateBookingState("vehicle");

    const [navigatedToSuccess, setNavigatedToSuccess] = useState(0);
    const [postDone, setPostDone] = useState(false);

    const [{ data, loading, error }, postCreation] = useAxios({
        url: `${GRCGDS_BACKEND}`,
        method: 'POST',
    })

    const [arrivalTimeReq] = useAxios({
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${originLocation?.Branchname} ${originLocation?.CountryCode}&destinations=${returnLocation?.Branchname} ${returnLocation.CountryCode}&key=AIzaSyBJ8evu2aDcSyb2F2NIuNQ3L5TeLAGpino`
    })

    useEffect(() => {
        console.log("postDone",postDone)
        console.log("navigatedToSuccess",navigatedToSuccess)
        console.log("arrivalTimeReq",arrivalTimeReq.data)
        if (navigatedToSuccess == 0) return
        if (postDone) return
        if (!arrivalTimeReq.data || !arrivalTimeReq.data.rows[0] || !arrivalTimeReq.data.rows[0].elements[0] || !arrivalTimeReq.data.rows[0].elements[0].duration) return

        const data = {
            pickup_date: moment(departureTime).format("YYYY-MM-DD"),
            pickup_time: moment(departureTime).format("HH:mm"),
            dropoff_date: moment(returnTime).format("YYYY-MM-DD"),
            dropoff_time: moment(returnTime).format("HH:mm"),
            pickup_location: originLocation?.Branchid,
            dropoff_location: returnLocation?.Branchid,
            dropoff_location_long: originLocation?.Longd,
            dropoff_location_latd: originLocation?.Latd,
            pickup_location_long: returnLocation?.Longd,
            pickup_location_latd: returnLocation?.Latd,
            pickupCountry: originLocation.CountryCode,
            dropoffCountry: returnLocation.CountryCode,
            veh_id: vehicle?.VehID,
            currency_code: route.params.transactions[0].amount.currency,
            paypalPaymentId: route.params.paypalPaymentId,
            total_price: route.params.transactions[0].amount.total,
            arrivalTime: arrivalTimeReq.data.rows[0].elements[0].duration.text,
            module_name: "CREATE_BOOKING"
        }
        setArrivalTime(arrivalTimeReq.data.rows[0].elements[0].duration.text)
        postCreation({ data })
            .then((res) => {
                console.log("postCreation", res.data);
                navigation.navigate("Confirmation")
                setPostDone(true)
            })
            .catch((err) => {
                dispatchGlobalState({ type: 'error', state: "We could not create your booking!" });

                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            { name: 'Home' },
                        ],
                    })
                );
                setPostDone(true)
            })

    }, [navigatedToSuccess, arrivalTimeReq.loading]);

    return <WebView
        ref={ref => (webview.current = ref)}
        source={{ uri: route.params.url }}
        onNavigationStateChange={(e) => {
            const { url } = e;
            if (!url) return;

            // handle certain doctypes
            console.log('webview', url)
            if (url.includes('https://right-cars-club.com/')) {
                setNavigatedToSuccess(p => p+1)
            }
        }}
    />;
}
export default WebViewScreen
