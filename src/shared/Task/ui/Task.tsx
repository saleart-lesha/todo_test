import { Card, Checkbox, Flex, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import { ITask } from '../model/ITask'

interface TaskProps {
  task: ITask
}

const Task = ({ task }: TaskProps) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [checked, setChecked] = useState(task.completed)
  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <Text>{task.taskName}</Text>
      </Modal>
      <Card.Section withBorder inheritPadding py='xs'>
        <Flex align='center' gap='sm'>
          <Checkbox checked={checked} onChange={(e) => setChecked(e.currentTarget.checked)} />
          <Text
            truncate='end'
            td={task.completed ? 'line-through' : undefined}
            onClick={open}
            style={{ cursor: 'pointer' }}
          >
            {task.taskName}
          </Text>
        </Flex>
      </Card.Section>
    </>
  )
}

export default Task
