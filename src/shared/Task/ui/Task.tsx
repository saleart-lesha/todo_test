import { Card, Checkbox, Flex, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import TaskAction from '../../TaskAction/ui/TaskAction'
import { useUpdateTaskMutation } from '../api/TaskApi'
import { ITask } from '../model/ITask'
import classes from './Task.module.css'

interface TaskProps {
  task: ITask
}

const Task = ({ task }: TaskProps) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [updateTask] = useUpdateTaskMutation()

  const handlerUpdateTask = () => {
    updateTask({ ...task, completed: !task.completed })
  }
  return (
    <>
      <TaskAction task={task} opened={opened} close={close} action='update' />
      <Card.Section withBorder inheritPadding py='xs'>
        <Flex align='center' gap='sm' onClick={open} className={classes.form}>
          <Checkbox
            checked={task.completed}
            onClick={(e) => e.stopPropagation()}
            onChange={handlerUpdateTask}
          />
          <Text truncate='end' td={task.completed ? 'line-through' : undefined}>
            {task.taskName}
          </Text>
        </Flex>
      </Card.Section>
    </>
  )
}

export default Task
