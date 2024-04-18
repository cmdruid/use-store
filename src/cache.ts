import { useState } from 'react'

export type StoreType = 'local' | 'session'

export function useStoreCache <T> (
  store_key      : string,
  store_defaults : T,
  store_type     : StoreType = 'local'
) : [ T, (value: T) => void ] {
  // Fetch from storage and parse it as JSON.
  const get_init_value = () => {
    const stored_value = (store_type === 'session')
      ? sessionStorage.getItem(store_key)
      : localStorage.getItem(store_key)
    
    if (
      stored_value === undefined ||
      stored_value === null
    ) return store_defaults
    
    try {
      return JSON.parse(stored_value) as T
    } catch (err) {
      throw new Error('failed to parse data from store: ' + store_key)
    }
  }

  const [ storage, setCache ] = useState<T>(get_init_value)

  // Update session storage when the stored value is updated.
  const setStorage = (value: T) => {
    try {
      // Allow value to be a function so we have the same API as useState.
      const value_to_store = (value instanceof Function) ? value(storage) : value
      // Save state.
      setCache(value_to_store)
      // Save to storage.
      if (store_type === 'session') {
        sessionStorage.setItem(store_key, JSON.stringify(value_to_store))
      } else {
        localStorage.setItem(store_key, JSON.stringify(value_to_store))
      }
    } catch (err) {
      // A more advanced implementation would handle the error case.
      throw new Error('failed to serialize data to store: ' + String(value))
    }
  }

  return [ storage, setStorage ]
}
