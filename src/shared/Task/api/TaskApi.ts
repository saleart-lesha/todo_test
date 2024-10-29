import { TodoService } from '../../../app/services/TodoService'
import { ITask } from '../model/ITask'

const TaskApi = TodoService.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<ITask[], void>({
      query: () => ({
        url: '/tasks',
      }),
      providesTags: ['Tasks'],
    }),
    updateTask: build.mutation<ITask, Partial<ITask>>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `tasks/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['Tasks'],
    }),
    addTask: build.mutation<void, { taskName: string; completed: boolean }>({
      query: (body) => ({
        url: '/tasks',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tasks'],
    }),
    deleteTask: build.mutation<void, number>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
})

export const {
  useGetTasksQuery,
  //   useGetTaskDetailsQuery,
  useUpdateTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
} = TaskApi
