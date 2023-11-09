# use-store

A simple and easy-to-use reducer store, made with pure react.

- Create a store and context provider with default values.
- Uses a simple API: `store`, `update`, and `reset`.
- Easily setup your own type interface for full type saftey!

## Import

This package is available on NPM for easy import:

```bash
# Using NPM
npm install @cmdcode/use-store
# Using Yarn
yarn add @cmdcode/use-store
```

## Basic Usage

First, create a custom store:

`/your-project/src/context/DemoStore.tsx`

Here is an example of how to create a demo store:

```tsx
// Import the package.
import { createStore, StoreAPI } from '@cmdcode/use-store'

// Setup your own custom Store interface.
export interface DemoStore {
  posts : string[]
}

// Setup the default values for your store.
const defaults : DemoStore = {
  posts : []
}

// Optional: If you would like to return a custom store object, use a
// middleware method that takes the default store and returns a custom store.
const middleware = (store : StoreAPI<DemoStore>) => {
  const say_hello = () => console.log('hello world!')
  return { ...store, say_hello }
}

// Optional: If you would like the store to be cached in the browser's 
// session storage, define a key for the session store.
const session_key = 'my_unique_key'

// Export the provider and store hook for use in your app.
export const { StoreProvider, useStore } = createStore({ defaults, middleware, session_key })
```

The next step is to wrap your react app with the store provider:

```tsx
// Example base app for react / nextjs.
// Your project may look slightly different.
import { StoreProvider } from './src/context/DemoStore.js'

export default function App ({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}
```

With the `StoreProvider` configured, importing the store is relatively simple.

Here is a basic example of reading from the store:

```tsx
import { useStore } from './src/context/DemoStore.js'

export default function View () {
  const { store } = useStore()

  return (
    <div>
      <h2>Latest Posts:</h2>
      { store.posts.map(post => <pre>{ post }</pre>) }
    </div>
  )
}
```

Here is an example of updating and resetting the store:

```tsx
import { useState } from 'react'
import { useStore } from './src/context/DemoStore.js'

export default function Post () {
  const [ text, setText ] = useState('')
  const { store, update, reset } = useStore()

  const submit = () => {
    const posts = [ ...store.posts, text ]
    console.log(posts)
    update({ posts })
  }

  const clear = () => {
    reset()
  }

  return (
    <div>
      <input 
        name     = 'post' 
        value    = { text } 
        onChange = { (e) => setText(e.target.value) }
      />
      <div className='controls'>
        <button onClick={ submit }>Submit</button>
        <button onClick={ clear }>Clear</button>
      </div>
      
    </div>
  )
}
```

## Development / Testing

This library uses `yarn` for package management and `vite` for a development / demo server.

```bash
## Clean up any old builds:
yarn clean
## Start the vite development server:
yarn dev
## Release a new build:
yarn release
```

## Bugs / Issues

If you run into any bugs or have any questions, please submit an issue ticket.

## Contribution

Feel free to fork and make contributions. Suggestions are welcome!

## License

Use this library however you want!

## Contact

You can find me on nostr at: `npub1gg5uy8cpqx4u8wj9yvlpwm5ht757vudmrzn8y27lwunt5f2ytlusklulq3`
