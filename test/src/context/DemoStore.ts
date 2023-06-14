import { createStore } from '../../../src/index.jsx'

export interface DemoStore {
  posts : string[]
}

const defaults : DemoStore = {
  posts : []
}

export const { StoreProvider, useStore } = createStore(defaults)