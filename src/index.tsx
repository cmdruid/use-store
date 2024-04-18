import { useStoreCache } from './cache.js'
import { create_store }  from './store.js'

import {
  createContext,
  ReactElement,
  useContext
} from 'react'

type Props = { children : ReactElement }

interface StoreConfig <T, R> {
  defaults    : T
  middleware ?: (store : StoreAPI<T>) => R
  store_key  ?: string
}

export type StoreAPI<T> = ReturnType<typeof create_store<T>>

function create_provider<T, R = StoreAPI<T>> (
  config : StoreConfig<T, R>
) {
  const { defaults, middleware, store_key } = config

  // Create our provider context.
  const context = createContext<R | null>(null)

  function StoreProvider (
    { children } : Props
  ) : ReactElement {
    // Returns the Provider that wraps our app and
    // passes down the context object.
    const store = create_store(defaults, store_key)

    const ctx = (typeof middleware === 'function')
      ? middleware(store)
      : store as R

    return (
      <context.Provider value={ctx}>
        {children}
      </context.Provider>
    )
  }

  function useStore () : R {
    const ctx = useContext(context)
    if (ctx === null) {
      throw new Error('Context is null!')
    } else {
      return ctx
    }
  }

  return { StoreProvider, useStore }
}

export { create_store, create_provider, useStoreCache }
