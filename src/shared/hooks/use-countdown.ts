import { useEffect, useState } from 'react';

export function useCountdown(initialSeconds: number) {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        if (seconds <= 0) return;

        const timer = setInterval(() => { setSeconds((value) => value - 1); }, 1000);

        return () => clearInterval(timer);
    }, [seconds]);

    const restart = () => {
        setSeconds(initialSeconds);
    };

    return { seconds, restart, isFinished: seconds === 0 };
}