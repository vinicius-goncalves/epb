import { createContext, useEffect, useState } from 'react';

interface ProgressContextProps {
	total: number;
	loaded: number;
	concluded: number;
	isFinished?: boolean;
	isLoading?: boolean;
	isInProgress?: boolean;
}

export interface ProgressContextType {
	progress: ProgressContextProps;
	setProgress: React.Dispatch<React.SetStateAction<ProgressContextProps>>;
}

export const ProgressContext = createContext<ProgressContextType | null>(null);

const initialState: ProgressContextProps = {
	total: 0,
	loaded: 0,
	concluded: 0,
	isFinished: false,
	isLoading: true,
	isInProgress: false,
};

function isProgressFinished(progress: ProgressContextProps) {
	const { total, concluded } = progress;
	return total > 0 && concluded > 0 && concluded >= total;
}

function isProcessLoading(progress: ProgressContextProps) {
	const { isFinished, total, loaded } = progress;
	return !isFinished && total > 0 && loaded > 0;
}

export function ProgressProvider({ children }: { children: React.ReactNode }): JSX.Element {
	const [progress, setProgress] = useState<ProgressContextProps>(initialState);

	useEffect(() => {
		if (isProcessLoading(progress)) {
			setProgress((prevProgress) => ({ ...prevProgress, isLoading: true }));
		}

		if (isProgressFinished(progress)) {
			setProgress({ ...initialState, isFinished: true, isLoading: false });
		}

		console.log('a');
	}, [progress]);

	return <ProgressContext.Provider value={{ progress, setProgress }}>{children}</ProgressContext.Provider>;
}
