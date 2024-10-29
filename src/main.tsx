import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store/store.ts'
import Todos from './pages/mainPage/Todos.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MantineProvider>
      <Todos />
    </MantineProvider>
  </Provider>,
)
