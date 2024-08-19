import { useContext } from 'react';
import { ProgressContext, type ProgressContextType } from '../contexts/ProgressContext';

export function useProgressContext(): ProgressContextType {
	const ctx = useContext(ProgressContext) as ProgressContextType;
	return ctx;
}
