import { useState } from "react"

export function useLocalStorage<T>(key: string, defaultValue: T) {
	const [localStorageValue, setLocalStorageValue] = useState<T>(() => {
			try {
					const value = localStorage.getItem(key);
					if (value) {
							return JSON.parse(value)
					} else {
							localStorage.setItem(key, JSON.stringify(defaultValue));
							return defaultValue
					}
			} catch (error) {
					localStorage.setItem(key, JSON.stringify(defaultValue));
					return defaultValue
			}
	})

	// this method update our localStorage and our state
	const setLocalStorageStateValue = (valueOrFn: unknown | ((prev: T) => unknown)) => {
			let newValue;
			if (typeof valueOrFn === 'function') {
					const fn = valueOrFn;
					newValue = fn(localStorageValue)
			}
			else {
					newValue = valueOrFn;
			}
			localStorage.setItem(key, JSON.stringify(newValue));
			setLocalStorageValue(newValue)
	}
	return [localStorageValue, setLocalStorageStateValue] as const;
}