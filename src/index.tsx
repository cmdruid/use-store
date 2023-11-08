import {
  createContext,
  ReactElement,
  useContext
} from 'react'

import { initStore } from './store.js'

export type StoreProps  = { children : ReactElement }
export type StoreAPI<T> = ReturnType<typeof initStore<T>>

export function createStore<T> (
  defaults   : T,
  cache_key ?: string
) {
  // Create our provider context.
  const context = createContext<StoreAPI<T> | null>(null)

  function StoreProvider (
    { children } : StoreProps
  ) : ReactElement {
    // Returns the Provider that wraps our app and
    // passes down the context object.
    const ctx = initStore(defaults, cache_key)

    return (
      <context.Provider value={ctx}>
        {children}
      </context.Provider>
    )
  }

  function useStore () {
    const ctx = useContext(context)
    if (ctx === null) {
      throw new Error('Context is null!')
    }
    return ctx
  }

  return { StoreProvider, useStore }
}
