import { ActionIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons-react'
import TaskAction from '../../../shared/TaskAction/ui/TaskAction'
import classes from './CreateTaskBtn.module.css'
const CreateTaskBtn = () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <TaskAction opened={opened} close={close} action='create' />
      <ActionIcon size='xl' radius='xl' onClick={open} className={classes.btn}>
        <IconPlus size={40} stroke={1.5} />
      </ActionIcon>
    </>
  )
}

export default CreateTaskBtn
