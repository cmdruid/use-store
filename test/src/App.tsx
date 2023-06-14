import { ReactElement } from 'react'

import PostView from './components/View'
import SendPost from './components/Post'

export default function App () : ReactElement {

  return (
    <div className='App'>
      <PostView />
      <SendPost />
    </div>
  )
}
