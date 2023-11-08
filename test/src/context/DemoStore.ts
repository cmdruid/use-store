import { createStore } from '../../../src/index.jsx'

export interface DemoStore {
  posts : string[]
}

const defaults : DemoStore = {
  posts : []
}

const key = 'my_unique_key'

export const [ StoreProvider, useStore ] = createStore(defaults, key)
