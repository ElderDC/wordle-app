import { useState } from "react";
import { Text } from "@/components/ui/atoms"
import { useCountDown } from "@/hooks";
import {
    MILLISECONDS_OF_A_DAY,
    MILLISECONDS_OF_A_HOUR,
    MILLISECONDS_OF_A_MINUTE,
    MILLISECONDS_OF_A_SECOND,
} from "@/models/time.model";
import { addZeroToLeft } from '@/utils/time.util'

interface TimerProps {
    target: number
}

const Timer = (props: TimerProps) => {
    const { target } = props

    const [time, setTime] = useState<string>('')

    function setRemaining() {
        const duration = target - Date.now();
        const remainingHours = Math.floor((duration % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR);
        const remainingMinutes = Math.floor((duration % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE);
        const remainingSeconds = Math.floor((duration % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND);

        setTime(`${addZeroToLeft(remainingHours)}:${addZeroToLeft(remainingMinutes)}:${addZeroToLeft(remainingSeconds)}`)
    }

    useCountDown(target, { onDown: setRemaining, onEnd: () => setTime('00:00:00') })
    
    return (
        <Text size='h6' weight='bold'>
            { time }
        </Text>
    )
}

export default Timer