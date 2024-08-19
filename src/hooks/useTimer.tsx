import { useEffect, useRef, useState } from 'react';

export function useTimer() {
	const [timer, setTime] = useState<string>((performance.now() / 1000).toFixed(2));
	const interval = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		interval.current = setInterval(() => {
			const p = performance.now();
			setTime((p / 1000).toFixed(2));
		}, 10);
	}, []);

	const stop = () => {
		clearInterval(interval.current!);
	};

	return {
		stop,
		timer,
	};
}
