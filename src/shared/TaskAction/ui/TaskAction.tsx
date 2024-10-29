import { Button, Flex, Modal, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { useEffect } from 'react'
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from '../../Task/api/TaskApi'
import { ITask } from '../../Task/model/ITask'

interface TaskActionProps {
  opened: boolean
  close: () => void
  action: string
  task?: ITask
}

const TaskAction = ({ task, opened, close, action }: TaskActionProps) => {
  const form = useForm({
    initialValues: {
      name: task ? task.taskName : '',
    },
    validate: {
      name: isNotEmpty('Введите задачу'),
    },
  })

  const [updateTask, { isSuccess: isSuccessUpdate }] = useUpdateTaskMutation()
  const [deleteTask, { isSuccess: isSuccessDelete }] = useDeleteTaskMutation()
  const [createTask, { isSuccess: isSuccessCreate }] = useCreateTaskMutation()

  useEffect(() => {
    if (opened) {
      form.setFieldValue('name', task ? task.taskName : '')
    }
  }, [opened])

  useEffect(() => {
    close()
  }, [isSuccessDelete, isSuccessUpdate, isSuccessCreate])

  return (
    <Modal opened={opened} onClose={close} withCloseButton={false}>
      <Flex direction='column' gap='sm'>
        <TextInput label='Задача' placeholder='Добавить задачу' {...form.getInputProps('name')} />
        {action === 'update' && task && (
          <Flex gap='sm'>
            <Button
              fullWidth
              onClick={() => {
                if (!form.validate().hasErrors) {
                  updateTask({
                    id: task.id,
                    taskName: form.values.name,
                    completed: task.completed,
                  })
                }
              }}
            >
              Сохранить
            </Button>
            <Button fullWidth onClick={() => deleteTask(task.id)} color='red'>
              Удалить
            </Button>
          </Flex>
        )}
        {action === 'create' && (
          <Button
            onClick={() => {
              if (!form.validate().hasErrors) {
                createTask({ taskName: form.values.name, completed: false })
              }
            }}
          >
            Создать
          </Button>
        )}
      </Flex>
    </Modal>
  )
}

export default TaskAction
