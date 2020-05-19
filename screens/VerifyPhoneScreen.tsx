import React, { useRef } from 'react';
import { Layout, Text, Button, Datepicker, NativeDateService, TabView, Card, Avatar } from '@ui-kitten/components';
import { SafeAreaView, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DocumentScreen = () => {
  const navigation = useNavigation();

  const inputs = [
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null),
    useRef<TextInput | null>(null)
  ]

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

      <Layout style={{ flex: 1, padding: '5%', backgroundColor: '#f7f9fc' }}>

        <Layout style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#00000000' }}>
          <Text style={{ textAlign: 'left' }} category="h3">Verify phone number</Text>
          <Text category="s1"> Check your SMS messages. We've sent you the PIN at (+1) 080-744-5078</Text>
        </Layout>


        <Layout style={{ display: 'flex', flexDirection: 'row', height: '20%', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#00000000', marginTop: '15%', marginBottom: '15%' }}>
          <TextInput ref={ref => inputs[0].current = ref} value={pin[0] !== -1 ? pin[0].toString() : ''} onKeyPress={(e) => { onInput(e) }} autoFocus maxLength={1} style={{ textAlign: 'center', backgroundColor: 'white', borderRadius: 30, fontSize: 20, height: 80, width: '20%' }} />
          <TextInput ref={ref => inputs[1].current = ref} value={pin[1] !== -1 ? pin[1].toString() : ''} onKeyPress={(e) => { onInput(e) }} maxLength={1} style={{ textAlign: 'center', backgroundColor: 'white', borderRadius: 30, fontSize: 20, height: 80, width: '20%' }} />
          <TextInput ref={ref => inputs[2].current = ref} value={pin[2] !== -1 ? pin[2].toString() : ''} onKeyPress={(e) => { onInput(e) }} maxLength={1} style={{ textAlign: 'center', backgroundColor: 'white', borderRadius: 30, fontSize: 20, height: 80, width: '20%' }} />
          <TextInput ref={ref => inputs[3].current = ref} value={pin[3] !== -1 ? pin[3].toString() : ''} onKeyPress={(e) => { onInput(e) }} maxLength={1} style={{ textAlign: 'center', backgroundColor: 'white', borderRadius: 30, fontSize: 20, height: 80, width: '20%' }} />
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
            Verify
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