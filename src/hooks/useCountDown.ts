import { useEffect } from "react";

type Handler = () => void

interface CountDownOptions {
    interval?: number
    onDown?: Handler
    onEnd?: Handler
}

const noop = () => {} 

function useCountDown(endTime: number, props: CountDownOptions) {
    const { interval = 1000, onDown = noop, onEnd = noop, } = props

    useEffect(() => {
        const id = setInterval(() => {
            if (!endTime) clearInterval(id)
            else if (endTime < Date.now()) onEnd()
            else onDown()
        }, interval);
        return () => clearInterval(id)
    }, [endTime]);
}

export default useCountDown