import { useState } from 'react'
import { useStore } from '@/context/DemoStore'

export default function () {
  const [ text, setText ] = useState('')
  const { store, update, reset } = useStore()

  const submit = () => {
    const posts = [ ...store.posts, text ]
    update({ posts })
  }

  const clear = () => {
    reset()
  }

  return (
    <div className='container' id='post'>
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
