import { StoreAPI, createStore } from '../../../src/index.jsx'

export interface DemoStore {
  posts : string[]
}

const defaults : DemoStore = {
  posts : []
}

const session_key = 'my_unique_key'

const middleware = (store : StoreAPI<DemoStore>) => {
  const say_hello = () => console.log('hello world!')
  return { ...store, say_hello }
}

export const { StoreProvider, useStore } = createStore({ defaults, middleware, session_key })
