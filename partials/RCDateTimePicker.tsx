import React, { useState, useEffect } from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, Button } from '@ui-kitten/components';
import { setHours, getHours, setMinutes, getMinutes } from 'date-fns'

const RCDateTimePicker: React.FC<{ onChange: (dateTime: Date) => void, isVisible: boolean }> = ({ onChange, isVisible = false }) => {
    const [time, setTime] = useState(new Date())
    const [date, setDate] = useState(new Date())
    const [steps, setSteps] = useState(0);

    useEffect(() => {
        if (isVisible == true) setSteps(1)
    }, [isVisible])

    return (
        <>
        { steps == 1 && (
            <DateTimePicker
                value={date}
                mode={"date"}
                is24Hour={false}
                display="default"
                onChange={(e, d) => {
                    if (d) setDate(d)
                    setSteps(2)
                }}
            />
        )}
        { steps == 2 && (
            <DateTimePicker
                value={time}
                mode={"time"}
                is24Hour={false}
                display="default"
                onChange={(e, d) => {
                    if (d) {
                        setTime(d)
                        setSteps(0)
                        const dateTime = setMinutes(setHours(date, getHours(d)), getMinutes(d))
                        onChange(dateTime)
                    }
                }}
            />
        )}
        </>
    )
};

export default RCDateTimePicker