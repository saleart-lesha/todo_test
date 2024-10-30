import { MantineProvider } from '@mantine/core'
import { render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { Provider } from 'react-redux'
import { beforeEach, describe, expect, it } from 'vitest'
import { store } from '../../../app/store/store'
import { server } from '../../../app/test/setupTests'
import { TaskApi } from '../../../shared/Task/api/TaskApi'
import Todos from './Todos'

describe('Todos', () => {
  beforeEach(() => {
    server.resetHandlers()
    store.dispatch(TaskApi.util.resetApiState())
  })

  it('Отображение задач при успешной загрузке', async () => {
    server.use(
      http.get('/tasks', () => {
        return HttpResponse.json([
          { id: '1', taskName: 'First Task', completed: false },
          { id: '2', taskName: 'Second Task', completed: false },
        ])
      }),
    )

    render(
      <Provider store={store}>
        <MantineProvider>
          <Todos />
        </MantineProvider>
      </Provider>,
    )

    await waitFor(() => {
      expect(screen.getByText('First Task')).toBeInTheDocument()
      expect(screen.getByText('Second Task')).toBeInTheDocument()
    })
  })

  it('Сообщение об ошибке', async () => {
    server.use(
      http.get('/tasks', () => {
        return HttpResponse.json('', { status: 500 })
      }),
    )

    render(
      <Provider store={store}>
        <MantineProvider>
          <Todos />
        </MantineProvider>
      </Provider>,
    )

    await waitFor(() => {
      expect(screen.getByText('Ошибка загрузки')).toBeInTheDocument()
    })
  })

  it('Нет задач', async () => {
    server.use(
      http.get('/tasks', () => {
        return HttpResponse.json([])
      }),
    )

    render(
      <Provider store={store}>
        <MantineProvider>
          <Todos />
        </MantineProvider>
      </Provider>,
    )

    await waitFor(() => {
      expect(screen.getByText('У вас нет задач')).toBeInTheDocument()
    })
  })
})
