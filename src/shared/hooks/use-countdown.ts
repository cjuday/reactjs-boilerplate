import { useEffect, useState } from 'react';

export function useCountdown(expiresAt: string | Date | null) {
    const calculateSeconds = () => {
        if (!expiresAt) return 0;
        const target = expiresAt instanceof Date ? expiresAt.getTime() : new Date(expiresAt).getTime();
        return Math.max(0, Math.floor((target - Date.now()) / 1000));
    };

    const [seconds, setSeconds] = useState(calculateSeconds);

    useEffect(() => {
        setSeconds(calculateSeconds());
        const timer = setInterval(() => { setSeconds(calculateSeconds()); }, 1000);
        return () => clearInterval(timer);
    }, [expiresAt]);

    const restart = (newExpiresAt?: string | Date | null) => {
        if (!newExpiresAt) {
            setSeconds(0);
            return;
        }

        const target = newExpiresAt instanceof Date ? newExpiresAt.getTime() : new Date(newExpiresAt).getTime();
        setSeconds(Math.max(0, Math.floor((target - Date.now()) / 1000)));
    };

    return {seconds, restart, isFinished: seconds <= 0 };
}