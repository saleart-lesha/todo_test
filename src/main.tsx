import { MantineProvider } from '@mantine/core'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import Todos from './Todos.tsx'
import { store } from './app/store/store.ts'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MantineProvider>
      <Todos />
    </MantineProvider>
  </Provider>,
)
