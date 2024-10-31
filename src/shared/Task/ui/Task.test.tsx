import { Card, MantineProvider } from '@mantine/core'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { http } from 'msw'
import { Provider } from 'react-redux'
import { beforeEach, describe, expect, it } from 'vitest'
import { store } from '../../../app/store/store'
import { server } from '../../../app/test/setupTests'
import { TaskApi } from '../api/TaskApi'
import Task from './Task'

describe('TaskAction', () => {
  beforeEach(() => {
    server.resetHandlers()
    store.dispatch(TaskApi.util.resetApiState())
  })
  it('Изменение статуса выполнения задачи', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let requestBody: any | null = null
    server.use(
      http.put('/tasks/1', async ({ request }) => {
        requestBody = await request.json()
      }),
    )

    render(
      <Provider store={store}>
        <MantineProvider>
          <Card>
            <Task task={{ id: '1', taskName: 'task', completed: false }} />
          </Card>
        </MantineProvider>
      </Provider>,
    )

    fireEvent.click(screen.getByRole('checkbox'))

    await waitFor(() => {
      expect(requestBody).toEqual({ taskName: 'task', completed: true })
    })
  })
})
