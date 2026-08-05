export function formatCountdown(seconds: number): string {
    if (seconds <= 0) {
        return '0s';
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
        return `${minutes.toString().padStart(2, '0')}m ${remainingSeconds
            .toString()
            .padStart(2, '0')}s`;
    }
    
    return `${remainingSeconds}s`;
}