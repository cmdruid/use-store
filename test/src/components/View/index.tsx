import { useStore } from '@/context/DemoStore'

export default function () {
  const { store } = useStore()

  const keygen = () => Math.floor(Math.random() * 1000)

  return (
    <div className='container' id='posts'>
      <h2>Latest Posts:</h2>
      { store.posts.map(post => <pre key={keygen()}>{ post }</pre>) }
    </div>
  )
}
