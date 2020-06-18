import React, { useState, useRef, useEffect } from 'react';
import RNPhoneInput from 'react-native-phone-input'
import ReactNativePhoneInput from 'react-native-phone-input';
import { TextInput } from 'react-native-gesture-handler';
import { StyleProp, TextStyle } from 'react-native';

type Props = {
    mobilecode?: string
    mobileNumber?: string
    onCodeChange: (number: string) => void
    onNumberChange: (code: string) => void
    styles?: TextStyle
}
const PhoneInput: React.FC<Props> = ({ mobilecode, mobileNumber = "", onCodeChange, onNumberChange, styles }) => {
    const [phonenumberToShow, setPhonenumberToShow] = useState<string>(mobileNumber);
    const phoneInput = useRef<ReactNativePhoneInput<typeof TextInput> | null>(null);

    useEffect(() => {
        if (!phoneInput.current) return
        if (!mobilecode) {
            phoneInput.current.selectCountry('us');
            return
        }
        const code = phoneInput.current.getAllCountries().find(obj => {
            const countryDialCode = obj.dialCode
            const copy = mobilecode.toString()
            return copy.replace("+", "") == countryDialCode;
        })
        phoneInput.current.selectCountry(code ? code.iso2 : 'us')
    }, [phoneInput.current])

    return (
        <RNPhoneInput
            style={{ borderWidth: 1, borderRadius: 10, padding: 15, ...styles }}
            textProps={{
                placeholder: 'Mobile number',
                value: `${mobilecode || '+1'} ${phonenumberToShow}`,
                onChangeText: (c: string) => {
                    setPhonenumberToShow(p => {
                        const number = c.toString().replace(mobilecode || '+1', "").replace(" ", "")
                        const rawNumber = (number || '').replace('+', '')

                        onNumberChange(rawNumber)
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
                onCodeChange(`+${phoneInput.current?.getCountryCode()}` || '+1')
            }}
        />
    )
};

export default PhoneInput