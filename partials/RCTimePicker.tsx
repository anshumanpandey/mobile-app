import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const RCTimePicker: React.FC<{ onChange: (dateTime: Date) => void, isVisible: boolean, date: Date }> = ({ onChange, date: dateValue, isVisible = false }) => {
    const [time, setTime] = useState(dateValue)
    const [steps, setSteps] = useState(0);

    useEffect(() => {
        if (isVisible == true) setSteps(1)
    }, [isVisible])

    return (
        <>
        { steps == 1 && (
            <DateTimePicker
                value={time}
                mode={"time"}
                is24Hour={false}
                minuteInterval={30}
                display="default"
                onChange={(e, d) => {
                    setSteps(0)
                    if (d) {
                        setTime(d)
                        onChange(d)
                    }
                }}
            />
        )}
        </>
    )
};

export default RCTimePicker