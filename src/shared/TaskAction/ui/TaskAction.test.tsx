import { MantineProvider } from '@mantine/core'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { http } from 'msw'
import { Provider } from 'react-redux'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { store } from '../../../app/store/store'
import { server } from '../../../app/test/setupTests'
import { TaskApi } from '../../Task/api/TaskApi'
import TaskAction from './TaskAction'

describe('TaskAction', () => {
  beforeEach(() => {
    server.resetHandlers()
    store.dispatch(TaskApi.util.resetApiState())
  })

  it('Создание новой задачи', async () => {
    const closeFn = vi.fn()
    let requestBody = null

    server.use(
      http.post('/tasks', async ({ request }) => {
        requestBody = await request.json()
      }),
    )

    render(
      <Provider store={store}>
        <MantineProvider>
          <TaskAction opened={true} close={closeFn} action='create' />
        </MantineProvider>
      </Provider>,
    )

    fireEvent.change(screen.getByLabelText(/Задача/i), { target: { value: 'New Task' } })
    fireEvent.click(screen.getByText(/Создать/i))

    await waitFor(() => {
      expect(requestBody).toEqual({ taskName: 'New Task', completed: false })
    })
    expect(closeFn).toHaveBeenCalled()
  })

  it('Изменение задачи', async () => {
    const closeFn = vi.fn()

    let requestBody = null
    server.use(
      http.put('/tasks/1', async ({ request }) => {
        requestBody = await request.json()
      }),
    )

    render(
      <Provider store={store}>
        <MantineProvider>
          <TaskAction
            task={{ id: '1', taskName: 'old task', completed: false }}
            opened={true}
            close={closeFn}
            action='update'
          />
        </MantineProvider>
      </Provider>,
    )

    fireEvent.change(screen.getByLabelText(/Задача/i), { target: { value: 'updated task' } })
    fireEvent.click(screen.getByText(/Сохранить/i))

    await waitFor(() => {
      expect(requestBody).toEqual({ taskName: 'updated task', completed: false })
    })
  })

  it('Удаление задачи', async () => {
    const closeFn = vi.fn()

    let deleteRequestReceived = false
    server.use(
      http.delete('/tasks/2', () => {
        deleteRequestReceived = true
      }),
    )

    render(
      <Provider store={store}>
        <MantineProvider>
          <TaskAction
            task={{ id: '2', taskName: 'delete task', completed: false }}
            opened={true}
            close={closeFn}
            action='update'
          />
        </MantineProvider>
      </Provider>,
    )

    fireEvent.click(screen.getByText(/Удалить/i))

    await waitFor(() => {
      expect(deleteRequestReceived).toBe(true)
    })
  })
})
