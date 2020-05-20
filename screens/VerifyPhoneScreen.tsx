import React, { useRef } from 'react';
import { Layout, Text, Button, Datepicker, NativeDateService, TabView, Card, Avatar } from '@ui-kitten/components';
import { SafeAreaView, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { set } from 'react-native-reanimated';

const DocumentScreen = () => {
  const navigation = useNavigation();

  const inputs = [
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null)
  ]

  const [idxFocusInput, setIdxFocusInput] = React.useState<number>(-1);
  const [pin, setPin] = React.useState<Array<number>>([-1, -1, -1, -1]);

  const onInput = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {

    setPin(p => {
      if (e.nativeEvent.key === 'Backspace') {
        //@ts-ignore
        const lastElemet = [...p].reverse().find(i => i != -1);
        p[lastElemet - 1] = -1
        const nextInput = inputs[lastElemet - 1]
        if (nextInput) nextInput.current?.focus()

        return [...p]
      }

      if (!RegExp(`[0-9]`).test(e.nativeEvent.key)) return p

      const firstNull = p.indexOf(-1)
      if (firstNull !== -1) {
        p[firstNull] = parseInt(e.nativeEvent.key)
        const nextInput = inputs[firstNull+1]
        if (nextInput) nextInput.current?.focus()
      }
      return [...p]
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Layout style={{ flex: 1, padding: '5%', backgroundColor: 'white' }}>

        <Layout style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#00000000' }}>
          <Text style={{ textAlign: 'left' }} category="h3">Verify phone number</Text>
          <Text category="s1"> Check your SMS messages. We've sent you the PIN at </Text>
          <Text style={{ color: '#41d5fb' }}>(+1) 080-744-5078</Text>
        </Layout>


        <Layout style={{ display: 'flex', flexDirection: 'row', height: '20%', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#00000000', marginTop: '15%', marginBottom: '15%' }}>
          <TextInput onBlur={() => {setIdxFocusInput(-1)}} onFocus={() => {setIdxFocusInput(0)}} ref={ref => inputs[0].current = ref} value={pin[0] !== -1 ? pin[0].toString() : ''} onKeyPress={(e) => { onInput(e) }} maxLength={1} style={{ textAlign: 'center', fontFamily: 'SF-UI-Display_Bold' ,borderColor: idxFocusInput == 0 ? '#41D5FB':'#E4E9F2', borderWidth: 1,backgroundColor: 'white', borderRadius: 30, fontSize: 34, height: 80, width: '20%' }} />
          <TextInput onBlur={() => {setIdxFocusInput(-1)}} onFocus={() => {setIdxFocusInput(1)}} ref={ref => inputs[1].current = ref} value={pin[1] !== -1 ? pin[1].toString() : ''} onKeyPress={(e) => { onInput(e) }} maxLength={1} style={{ textAlign: 'center', fontFamily: 'SF-UI-Display_Bold' ,borderColor: idxFocusInput == 1 ? '#41D5FB':'#E4E9F2', borderWidth: 1,backgroundColor: 'white', borderRadius: 30, fontSize: 34, height: 80, width: '20%' }} />
          <TextInput onBlur={() => {setIdxFocusInput(-1)}} onFocus={() => {setIdxFocusInput(2)}} ref={ref => inputs[2].current = ref} value={pin[2] !== -1 ? pin[2].toString() : ''} onKeyPress={(e) => { onInput(e) }} maxLength={1} style={{ textAlign: 'center', fontFamily: 'SF-UI-Display_Bold' ,borderColor: idxFocusInput == 2 ? '#41D5FB':'#E4E9F2', borderWidth: 1,backgroundColor: 'white', borderRadius: 30, fontSize: 34, height: 80, width: '20%' }} />
          <TextInput onBlur={() => {setIdxFocusInput(-1)}} onFocus={() => {setIdxFocusInput(3)}} ref={ref => inputs[3].current = ref} value={pin[3] !== -1 ? pin[3].toString() : ''} onKeyPress={(e) => { onInput(e) }} maxLength={1} style={{ textAlign: 'center', fontFamily: 'SF-UI-Display_Bold' ,borderColor: idxFocusInput == 3 ? '#41D5FB':'#E4E9F2', borderWidth: 1,backgroundColor: 'white', borderRadius: 30, fontSize: 34, height: 80, width: '20%' }} />
        </Layout>

        <Button
          onPress={() => navigation.navigate('MyBookings')}
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
            {() => <Text style={{ color: 'white', fontFamily: 'SF-UI-Display_Bold', fontSize: 18}}>Verify</Text>}
          </Button>
        <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#00000000' }}>
          <Text style={{ textAlign: 'center' }}>Didn't receive SMS</Text>
          <Text style={{ color: '#41d5fb' }}> Resend Code</Text>
        </Layout>

      </Layout>
    </SafeAreaView>
  );
};

export default DocumentScreen