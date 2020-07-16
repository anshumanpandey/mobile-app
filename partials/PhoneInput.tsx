import React, { useState, useRef, useEffect } from 'react';
import RNPhoneInput from 'react-native-phone-input'
import ReactNativePhoneInput from 'react-native-phone-input';
import { TextInput } from 'react-native-gesture-handler';
import { TextStyle, Platform } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal'
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS_KEY } from '../utils/i18n';

type Props = {
    mobilecode?: string
    mobileNumber?: string
    onCodeChange: (number: string) => void
    onNumberChange: (code: string) => void
    onCountryChanged?: (code: string) => void
    styles?: TextStyle
}
const PhoneInput: React.FC<Props> = ({ mobilecode, mobileNumber = "", onCodeChange, onNumberChange, styles, onCountryChanged }) => {
    const { i18n } = useTranslation();
    const [phonenumberToShow, setPhonenumberToShow] = useState<string>(mobileNumber);
    const [showFlagModal, setShowFlagModal] = useState<boolean>(false);
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

    useFocusEffect(
        React.useCallback(() => {
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
        }, [])
    );

    const iosStyles = {}
    if (Platform.OS == 'ios') {
        iosStyles.paddingTop = 15
        iosStyles.paddingBottom = 15
    }

    return (
        <>
            <RNPhoneInput
                style={{ borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, ...iosStyles, ...styles }}
                textProps={{
                placeholderTextColor: "#949494",
                style: { color: '#000000' },
                placeholder: i18n.t(TRANSLATIONS_KEY.MOBILE_NUMBER_WORD).toString(),
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
                onPressFlag={() => setShowFlagModal(true)}
            />
            {showFlagModal && <CountryPicker
                countryCode="US"
                withFilter={true}
                visible={true}
                withFlagButton={false}
                onClose={() => setTimeout(() => setShowFlagModal(false), 0)}
                onSelect={(country) => {
                    phoneInput.current?.selectCountry(country.cca2.toLowerCase())
                    setTimeout(() => {
                        onCountryChanged && onCountryChanged(country.cca2.toLowerCase())
                        setShowFlagModal(false)
                    }, 0);
                }}
            />}
        </>
    )
};

export default PhoneInput