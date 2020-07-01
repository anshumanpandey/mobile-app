import React, { useRef } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { SafeAreaView, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MenuButton from '../../partials/MenuButton';
import { ScrollView } from 'react-native-gesture-handler';

const DocumentScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Layout style={{ flex: 1, padding: '5%', backgroundColor: 'white' }}>

        <Layout style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#00000000', alignItems: 'center' }}>
          <MenuButton />
        </Layout>

        <ScrollView contentContainerStyle={{ display: 'flex', flexDirection: 'column', backgroundColor: '#00000000', marginTop: '10%', marginBottom: '10%' }}>
          <Text style={{ marginBottom: '5%', textAlign: 'center' }} category="h3">
            Terms and Conditions
          </Text>

          <Text style={{ marginBottom: '5%', textAlign: 'left' }} category="h5">
            1. Booking Terms and Conditions
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ marginRight: '1%' }} category="h6" >1.</Text>
            <Text style={{ textAlign: 'left' }} category="h6">
              1.1 This Agreement does not constitute a contract for the supply of vehicle rental services. The Rental Services (the “Rental Services”) will be supplied under a separate rental agreement to be entered into with a Right Cars Vehicle Rental Ltd, authorised Franchise/Licence owner who provides the vehicle (“the Local Supplier”) and you will be required to enter into this when you pick up your vehicle.
          </Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ marginRight: '1%' }} category="h6" >1.</Text>
            <Text style={{ textAlign: 'left' }} category="h6">
              1.2 For Pay Now bookings you are entering into this Agreement with Right Cars Vehicle Rental Ltd.
          </Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ marginRight: '1%' }} category="h6" >1.</Text>
            <Text style={{ textAlign: 'left' }} category="h6">
              1.3 For Pay Later bookings you are entering into this Agreement with the Local Supplier
          </Text>
          </View>

          <Text style={{ marginBottom: '5%', marginTop: '5%',textAlign: 'left' }} category="h5">
            2. Terms and Conditions for Pay Now
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ marginRight: '1%' }} category="h6" >1.</Text>
            <Text style={{ textAlign: 'left' }} category="h6">
              2.1 By accepting The terms and conditions within the booking process, you are entering into, and are bound by the terms and conditions of, only this Agreement with Right Cars Vehicle Rental Ltd. By entering into this Agreement, you are agreeing to purchase a redeemable voucher (“voucher”) from Right Cars Vehicle Rental Ltd for the amount of the rate quoted by Right Cars Vehicle Rental Ltd. Right will issue the voucher and send it to you by email and will book the Rental Services. The voucher can be exchanged for Rental Services, at the selected location and date and time as described in the voucher,with the Local Franchise/Licence Owner. You must present this voucher when you arrive to commence your rental service as defined in the voucher.
          </Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ marginRight: '1%' }} category="h6" >1.</Text>
            <Text style={{ textAlign: 'left' }} category="h6">
            2.2 You must pay the quoted charges relating to the voucher which on redemption entitles you to the rental services in full, excluding optional extras, at the time you make your booking on the website. The charges will be deducted from your credit or debit card at the time of booking. The voucher will not be issued until payment has been made in full. By entering into this Agreement you expressly authorise Right Cars Vehicle Rental Ltd to debit your credit or debit card the amount as shown on your voucher, excluding optional extras.
          </Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ marginRight: '1%' }} category="h6" >2.</Text>
            <Text style={{ textAlign: 'left' }} category="h6">
            2.3 The voucher you have purchased may be exchanged for the rental, inclusive of VAT, of the selected vehicle for the dates you have booked.
          </Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ marginRight: '1%' }} category="h6" >3.</Text>
            <Text style={{ textAlign: 'left' }} category="h6">
              2.4 All other optional equipment and services (e.g. special equipment, additional drivers, optional insurances, fuel, additional days) will incur additional charges, which you must pay directly to the Local Supplier either when you pick up or return your vehicle. Additional charges may also be made by the Local Supplier when you pick up your vehicle if you are under the age of 25 (Young Driver Surcharge).
          </Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ marginRight: '1%' }} category="h6" >4.</Text>
            <Text style={{ textAlign: 'left' }} category="h6">
              2.5 If you cancel your booking a cancellation fee will apply by way of compensation to Right Cars ® ™ Vehicle Rental Ltd. Please refer to our cancellation policy.
          </Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ marginRight: '1%' }} category="h6" >5.</Text>
            <Text style={{ textAlign: 'left' }} category="h6">
            2.6 If you fail to pick up your vehicle within 6 hours from the reservation date and time shown in your booking the full value of the reservation amount will become due as compensation to Right Cars Vehicle Rental Ltd: a) For bookings where the face value of the voucher is below £100 no refund will be made. b) For bookings where the face value of the voucher is above £100 , Right Cars Vehicle Rental Ltd will refund any amount in excess of £100.
          </Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ marginRight: '1%' }} category="h6" >6.</Text>
            <Text style={{ textAlign: 'left' }} category="h6">
            2.7 In order to obtain a refund of the amount you have paid for your voucher (where applicable) you must write to the following address requesting the money be refunded, within 5 working days of the start of the reservation defined on the voucher. Right Cars Vehicle Rental Ltd Suite 501, Regency House, 91 Western Road, Brighton, BN1 2NW, United Kingdom.
          </Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ marginRight: '1%' }} category="h6" >7.</Text>
            <Text style={{ textAlign: 'left' }} category="h6">
            2.7 In order to obtain a refund of the amount you have paid for your voucher (where applicable) you must write to the following address requesting the money be refunded, within 5 working days of the start of the reservation defined on the voucher. Right Cars Vehicle Rental Ltd Suite 501, Regency House, 91 Western Road, Brighton, BN1 2NW, United Kingdom.
          </Text>
          </View>

          <Text style={{ marginBottom: '5%', marginTop: '5%', textAlign: 'left' }} category="h5">
            3. Amending Pay Now Bookings
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ marginRight: '1%' }} category="h6" >1.</Text>
            <Text style={{ textAlign: 'left' }} category="h6">
              3.1 Subject to availability and the restrictions in clause 3.2 below, you can amend your booking up to 24 hours prior to picking up your vehicle via this website or at any time up until the time of the rental by calling the Right Cars Vehicle Rental Ltd on +44 (0) 1273 894600 . Subject to the conditions set out below.
          </Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ marginRight: '1%' }} category="h6" >1.</Text>
            <Text style={{ textAlign: 'left' }} category="h6">
              3.2 Changes to your booking are subject to the following restrictions: a) If you change a booking and the charges for the Rental Services are greater than the face value of your voucher, you will be charged the difference at Right Cars Vehicle Rental Ltd then-current rates and the additional amount (including any additional taxes) will be payable at the time of modification. b) If the cost of the changed booking is less than the cost of the face value of the voucher, NO REFUND will be made.
          </Text>
          </View>

          <Text style={{ marginBottom: '5%', marginTop: '5%', textAlign: 'left' }} category="h5">
            4. Terms and Conditions for Pay on Arrival
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ marginRight: '1%' }} category="h6" >1.</Text>
            <Text style={{ textAlign: 'left' }} category="h6">
              4.1 By accepting the terms and condition during the booking process you are entering into, and are bound by the terms and conditions of, only this Agreement (Reservation) with the Right Cars Vehicle Rental Ltd Franchise/Licence Owner. The Rental Services will be the subject of a separate rental agreement to be entered into with the Local Supplier.
          </Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ marginRight: '1%' }} category="h6" >1.</Text>
            <Text style={{ textAlign: 'left' }} category="h6">
              4.2 If you do not cancel your booking before the reservation date and time shown in your booking and fail to pick up your vehicle within 6 hours from that time, a non-cancellation fee of £100, (or the same amount in the local currency depending on the country of rental and exclusive of any applicable VAT) will apply by way of compensation to the Right Cars Vehicle Rental Ltd.
          </Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ marginRight: '1%' }} category="h6" >2.</Text>
            <Text style={{ textAlign: 'left' }} category="h6">
              4.3 Your booking constitutes a guaranteed booking by the Right Cars ® ™ Vehicle Rental Franchise/Licence Owner as appropriate. In the event that the Right Cars Vehicle Rental Ltd Franchise/Licence Owner fails to honour your booking for any reason, the Right Cars Franchise/Licence Owner will pay compensation to you, but Right Cars Vehicle Rental Ltd will not be liable for payment of any compensations.
          </Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ marginRight: '1%' }} category="h6" >3.</Text>
            <Text style={{ textAlign: 'left' }} category="h6">
            4.4 In the event that you are charged a non-cancellation fee due to an event of force majeure, including but not limited to, any act of God, terrorism, act of government or state, war, civil commotion, insurrection, embargo, or labour dispute, you shall be entitled to a refund on provision of appropriate evidence to the Right Cars Vehicle Rental Ltd Franchise/Licence Owner.
          </Text>
          </View>
        </ScrollView>

        <Button
          onPress={() => {
            navigation.navigate('MyBookings')
          }}
          size="giant"
          style={{
            backgroundColor: '#41d5fb',
            borderColor: '#41d5fb',
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
          {() => <Text style={{ color: 'white', fontFamily: 'SF-UI-Display_Bold', fontSize: 18 }}>Go Back</Text>}
        </Button>

      </Layout>
    </SafeAreaView>
  );
};

export default DocumentScreen