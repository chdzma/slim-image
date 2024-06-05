import { useDispatch } from 'react-redux'
import { Home } from './pages/Home'
import { useEffect } from 'react'
import { setConfig } from './store/reducers/configSlice'
import { Config } from './helper/config'

function App(): JSX.Element {
  const dispatch = useDispatch()

  useEffect(() => {
    const getConfigAndSaveToStore = async () => {
      window.electron.ipcRenderer
        .invoke('get-config')
        .then((config: Config) => {
          dispatch(setConfig(config))
        })
        .catch((error: Error) => {
          console.error('Error fetching config:', error)
        })
    }

    getConfigAndSaveToStore()
  }, [dispatch])

  return <Home />
}

export default App
