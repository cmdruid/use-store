import { useStore } from '@/context/DemoStore.js'

export default function () {
  const { store } = useStore()

  return (
    <div className='container' id='posts'>
      <h2>Latest Posts:</h2>
      { store.posts.map(post => <pre>{ post }</pre>) }
    </div>
  )
}
